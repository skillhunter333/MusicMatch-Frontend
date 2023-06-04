import Chatbox from "../components/chatcomponents/Chatbox";
import MyChats from "../components/chatcomponents/MyChats";
import UserListItem from "../components/chatcomponents/UserListItem";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { toastError } from "../lib/toastify";
import ChatLoading from "../components/chatcomponents/ChatLoading";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useAuthContext();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { setSelectedChat, notification, setNotification, chats, setChats } =
    ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user?search=${search}`,
        { withCredentials: true }
      );
      setLoading(false);
      setSearchResult(data);
      console.log(searchResult);
    } catch (error) {
      toastError("Failed to Load the Search Results");
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        { userId },
        { withCredentials: true }
      );

      if (!chats.find((c) => c._id === data._id)) setChats([...chats, data]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toastError(error.message || "Error fetching the chat");
    }
  };

  return (
    <>
      <div className="bg-red-400">
        {/* search input for finding users */}
        <div className="w-1/5 relative flex justify-center">
          <form>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-black rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Suche Musiker..."
                onChange={(e) => handleSearch(e.target.value)}
              />

              {loading
                ? setLoading(true)
                : searchResult
                    ?.slice(0, 4)
                    .map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => accessChat(user._id)}
                      />
                    ))}
            </div>
          </form>
        </div>

        {/* render mychats and the box which will render the actual chat */}

        <div>
          <div className="flex justify-between w-full h-[91.5vh] p-10 bg-slate-300">
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && (
              <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
