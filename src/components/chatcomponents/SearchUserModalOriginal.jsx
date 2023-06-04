import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { toastError } from "../../lib/toastify";
import { useAuthContext } from "../../context/AuthContext";
import UserListItem from "./UserListItem";
// import { MdClose } from "react-icons/md";

const SearchUserModal = ({ children }) => {
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
                placeholder="Nutzer nach Namen oder e-mail suchen..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

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
        </div>

        // <div className="w-1/5 relative flex justify-center">
        //   {loading
        //     ? setLoading(true)
        //     : searchResult
        //         ?.slice(0, 4)
        //         .map((user) => (
        //           <UserListItem
        //             key={user._id}
        //             user={user}
        //             handleFunction={() => accessChat(user._id)}
        //           />
        //         ))}
        // </div>
      )}
    </>
  );
};

export default SearchUserModal;
