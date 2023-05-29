
import axios from "axios";
import { useState } from "react";
import { ChatState } from "/../context/ChatProvider.jsx";
import UserListItem from "./UserListItem";
import { toastError, toastSuccess } from "../../lib/toastify.js";
import { useAuthContext } from "../../context/AuthContext.jsx";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
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
      const { data } = await axios.get(`/api/user?search=${search}`);
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
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        }
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
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        }
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
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        }
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
     <div>Update Group Chat Modal</div>
    </>
  );
};

export default UpdateGroupChatModal;
