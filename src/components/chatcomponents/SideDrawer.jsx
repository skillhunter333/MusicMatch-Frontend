import { useState } from "react";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { toastError } from '../../lib/toastify';
import UserListItem from "./UserListItem";
import { useAuthContext } from '../../context/AuthContext';
import { ChatState } from '../../context/ChatProvider';
//import Badge from 'react-badge';




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

  //Replaced some of the UI components.. needs to be adjusted

  return (
    <>
      <div className="flex justify-between items-center bg-white w-full p-5 border-5">
    
        <h1 className="text-2xl font-bold">MusicMatch</h1>
        <div className="flex">
          <div className="relative">
            <div className="relative">
  
  <svg className="w-6 h-6" viewBox="0 0 24 24">
  <path
    className="fill-current text-gray-500"
    d="M12 2C6.486 2 2 6.486 2 12c0 1.992.663 3.848 1.777 5.348L2 20.7V21h1.7l1.352-1.35C6.152 21.337 8.008 22 10 22h4c1.992 0 3.848-.663 5.348-1.778L20.3 21H21v-1.7l-1.35-1.352C21.337 17.848 22 16.008 22 14c0-4.414-3.586-8-8-8zm-2 18a1 1 0 01-.86-.498l-.108-.198-.66-1.32C6.702 17.262 4 14.64 4 12c0-3.314 2.686-6 6-6s6 2.686 6 6c0 2.64-2.702 5.262-4.372 7.984l-.628 1.254-.108.198A1 1 0 0110 20z"
  />
</svg>
</div>

            <i className="fas fa-bell text-2xl m-1" />
          </div>
          <div className="relative">
            <img
              className="w-8 h-8 rounded-full cursor-pointer"
              src={user.pic}
              alt={user.name}
            />
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 overflow-hidden ${isOpen ? "" : "hidden"}`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="px-4 py-2 border-b-2">Search Users</div>
                <div className="flex flex-col flex-grow overflow-auto">
                  <div className="flex pb-2">
                    <input
                      className="mr-2"
                      type="text"
                      placeholder="Search by name or email"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="px-2 py-1" onClick={handleSearch}>
                      Go
                    </button>
                  </div>
                  {loading ? (
                    <ChatLoading />
                  ) : (
                    searchResult?.map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => accessChat(user._id)}
                      />
                    ))
                  )}
                  {loadingChat && <div className="ml-auto flex"></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideDrawer;
            
          
    
