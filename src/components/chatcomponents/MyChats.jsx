import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "./ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";
import { ChatState } from "../../context/ChatProvider";
import { useAuthContext } from "../../context/AuthContext";
import { toastError } from "../../lib/toastify";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const { user } = useAuthContext();

  const userId = user._id


  const fetchChats = async () => {
    console.log(user._id);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat`, { withCredentials: true });
      setChats(data);
    } catch (error) {
      toastError(error.message || 'Error fetching Chats');
    }
  };

  useEffect(() => {
    setLoggedUser({ user });
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div className="flex flex-col items-center p-3 bg-white w-full md:w-1/3 rounded-lg border">
      <div className="pb-3 px-3 font-bold text-2xl flex w-full justify-between items-center">
        My Chats
        <GroupChatModal>
          <button className="flex text-lg items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Group Chat
          </button>
        </GroupChatModal>
      </div>
      <div className="flex flex-col p-3 bg-gray-200 w-full h-full rounded-lg overflow-y-hidden">
        {chats ? (
          <div className="overflow-y-scroll">
            {chats.map((chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                className={`cursor-pointer rounded-lg px-3 py-2 ${
                  selectedChat === chat ? "bg-teal-500 text-white" : "bg-gray-300 text-black"
                }`}
                key={chat._id}
              >
                <span>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </span>
                {chat.latestMessage && (
                  <p className="text-xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
      
};

export default MyChats;