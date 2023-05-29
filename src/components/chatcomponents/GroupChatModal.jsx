
import axios from "axios";
import { useState } from "react";
import { ChatState } from "/../context/ChatProvider";
import { toastError, toastSuccess } from "../../lib/toastify";
import { useAuthContext } from '../../context/AuthContext';

//import UserBadgeItem from "../userAvatar/UserBadgeItem";
//import UserListItem from "../userAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { chats, setChats } = ChatState();
  const { user } = useAuthContext();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toastError("User already added");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

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
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toastError("Please fill in all the fields");
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        });
      setChats([data, ...chats]);
      toastSuccess("New Group Chat Created!");
    } catch (error) {
      toastError(error.message);
    }
  };

  return (
    <div>Group chat</div>
   
  );
};

export default GroupChatModal;
