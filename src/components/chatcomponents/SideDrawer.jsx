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
  const [isOpen, setIsOpen] = useState(false);

  const {
    setSelectedChat,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const { user } = useAuthContext();



    const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/user?search=${search}`, { withCredentials: true });
      setLoading(false);
      setSearchResult(data);
      console.log(searchResult);
    } catch (error) {
      toastError("Failed to Load the Search Results");
    }
  };


  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, { userId }, { withCredentials: true });

      if (!chats.find((c) => c._id === data._id)) setChats([...chats, data]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toastError(error.message || "Error fetching the chat");
    }
  };

  

  return (
    <>
    <div className="bg-black w-2/6">
                
        <form>   
      
      <div className="relative">
        <input  type="search" 
                id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Suche Musiker..." 
                required
                onChange={(e) => handleSearch(e.target.value)} />
       
         {loading ? (<ChatLoading />) : 
            
            ( searchResult?.slice(0, 4).map((user) => (
              <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
    </div>
    </form>
    

        



          


    </div>
    </>
  );
}

export default SideDrawer;
            
          
    
