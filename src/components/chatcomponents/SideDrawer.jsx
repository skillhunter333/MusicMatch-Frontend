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
    
        <div className="flex">
          <div className="relative">
            <div className="relative">
</div>

          
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
            
          
    
