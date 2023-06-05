import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { toastError, toastSuccess } from "../../lib/toastify";
import { useAuthContext } from "../../context/AuthContext";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
// import { MdClose } from "react-icons/md";

const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { chats, setChats } = ChatState();
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

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      toastError("Please fill in all the fields");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        { withCredentials: true }
      );
      setChats([...chats, data]);
      toastSuccess("New Group Chat Created!");
    } catch (error) {
      toastError("Group chat must consist of more than 2 people");
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toastError("Nutzer bereits hinzugefügt");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl text-black font-bold mb-6">
              Gruppe erstellen
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
                className="border border-gray-300 text-black px-3 py-2 w-full rounded"
                type="text"
                placeholder="Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="border border-gray-300 px-3 py-2 w-full text-black rounded"
                type="text"
                placeholder="Nutzer hinzufügen zB. Renate, Marie, Julian"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <div className="flex flex-wrap">
                {selectedUsers.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </div>
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
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Chat erstellen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatModal;
