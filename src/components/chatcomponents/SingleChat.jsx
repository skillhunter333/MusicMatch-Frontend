
import { getSender, getSenderFull } from "./ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import animationData from "./typing.json";
import ProfileModal from './ProfileModal';
import io from "socket.io-client";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { ChatState } from "../../context/ChatProvider";
import { useAuthContext } from "../../context/AuthContext";
import { toastError } from "../../lib/toastify";
import typing from './typing.json';
import { motion } from 'framer-motion';

const ENDPOINT = import.meta.env.VITE_API_URL; 
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const { user } = useAuthContext();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/message/${selectedChat._id}`, { withCredentials: true });

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toastError(error.message || 'error socket');
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/message`, 
          {
            content: newMessage,
            chatId: selectedChat,
          },
          { withCredentials: true }
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toastError(error.message || 'failed to send the message');
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
  <>
    {selectedChat ? (
      <>
        <div className="text-4xl md:text-5xl pb-3 px-2 w-full flex justify-between items-center">
          <button
  className="flex md:hidden"
  onClick={() => setSelectedChat("")}
         ></button>
          {messages &&
            (!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            ))}
        </div>
        <div className="flex flex-col justify-end p-3 bg-gray-300 w-full h-full rounded-lg overflow-y-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
            </div>
          ) : (
            <div className="messages">
              <ScrollableChat messages={messages} />
            </div>
          )}


          <div className="mt-3">
            {istyping ? (
            <div>
            <motion.div
            animate={typing}
            />
            </div>
            ) : (
              <></>
            )}
            <input
              type="text"
              className="w-full bg-gray-200 px-3 py-2"
              placeholder="Enter a message.."
              value={newMessage}
              onChange={typingHandler}
              onKeyDown={sendMessage}


            />
          </div>
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center h-full">
        <p className="text-3xl pb-3 font-work-sans">
          Click on a user to start chatting
        </p>
      </div>
    )}
  </>
);
    };

export default SingleChat;
