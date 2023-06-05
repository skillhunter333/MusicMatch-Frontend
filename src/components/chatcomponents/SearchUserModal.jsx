import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { toastError, toastSuccess } from "../../lib/toastify";
import { useAuthContext } from "../../context/AuthContext";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
// import { MdClose } from "react-icons/md";

const GroupChatModal = ({ children }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { chats, setChats, selectedChat, setSelectedChat } = ChatState();
  const { user } = useAuthContext();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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
    } catch (error) {
      toastError("Failed to Load the Search Results");
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        { userId },
        { withCredentials: true }
      );

      if (!chats.find((c) => c._id === data._id)) setChats([...chats, data]);
      setSelectedChat(data);
      setLoading(false);
    } catch (error) {
      toastError(error.message || "Error fetching the chat");
    }
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl text-black font-bold mb-6">
              Nutzer finden
            </h2>
            <button
              className="relative -right-96 -top-16 text-gray-400 hover:text-gray-600"
              onClick={handleClose}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="mb-4">
              <input
                className="border border-gray-300 px-3 py-2 w-full text-black rounded"
                type="text"
                placeholder="Nutzer hinzufügen zB. Renate, Marie, Julian"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatModal;
