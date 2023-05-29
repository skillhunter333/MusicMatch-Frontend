import { useState } from "react";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { toastError } from '../../lib/toastify';
import UserListItem from "./UserListItem";
import { useAuthContext } from '../../context/AuthContext';
import { ChatState } from '../../context/ChatProvider';




const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const { user } = useAuthContext();



  const handleSearch = async () => {
    if (!search) {
        toastError('Please enter something in search');
    
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/user?search=${search}`, { withCredentials: true });
      setLoading(false);
      setSearchResult(data);
     
    } catch (error) {
            toastError(error.message || 'Failed to load search results');
          }
    
  };

  //deleted config to send the auth with headers as it should be sent automatically with the cookie?

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, { withCredentials: true }, { userId });

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toastError(error.message || "Error fetching the chat");
    }
  };

  //Replaced some of the UI components.. needs to be adjusted

 return (
  <div>search bar etc</div>
)}
            
          
    

export default SideDrawer;