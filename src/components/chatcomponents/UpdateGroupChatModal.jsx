
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";
import { toastError } from "../../lib/toastify.js";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { RiEyeFill } from 'react-icons/ri';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  

  const { selectedChat, setSelectedChat } = ChatState();
  const { user } = useAuthContext();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/user?search=${search}`, {withCredentials: true});
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toastError("Failed to Load the Search Results");
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        { withCredentials: true }
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toastError(error.message);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toastError("User Already in group!");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toastError("Only admins can add someone!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        { withCredentials: true }
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toastError(error.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toastError("Only admins can remove someone!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        }, { withCredentials: true }
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toastError(error.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center focus:outline-none"
      >
        <RiEyeFill size={24} color="red" />
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <h2 className="text-3xl font-bold text-center mb-4">
                    {selectedChat.chatName}
                  </h2>
                  <div className="mb-4">
                    {selectedChat.users.map((u) => (
                      <UserBadgeItem
                        key={u._id}
                        user={u}
                        admin={selectedChat.groupAdmin}
                        handleFunction={() => handleRemove(u)}
                      />
                    ))}
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      placeholder="Chat Name"
                      className="border-gray-300 border rounded px-3 py-2 mr-2"
                      value={groupChatName}
                      onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    <button
                      onClick={handleRename}
                      className="bg-teal-500 text-white py-2 px-4 rounded disabled:opacity-50"
                      disabled={renameloading}
                    >
                      Update
                    </button>
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Add User to group"
                      className="border-gray-300 border rounded px-3 py-2"
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  {loading ? (
                    <div className="flex justify-center">
                      loading...
                    </div>
                  ) : (
                    searchResult?.map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => handleAddUser(user)}
                      />
                    ))
                  )}
                </div>
                <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => handleRemove(user)}
                    className="w-full sm:w-auto text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
                  >
                    Leave Group
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UpdateGroupChatModal;
