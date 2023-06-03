import Chatbox from "../components/chatcomponents/Chatbox";
import MyChats from "../components/chatcomponents/MyChats";
import SideDrawer from "../components/chatcomponents/SideDrawer";
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react'



const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useAuthContext();

  return (
    <>
       <div className="w-full">
      {user && <SideDrawer />}
      <div className="flex justify-between w-full h-[91.5vh] p-10 bg-slate-300">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div> 
    </>
  );
  };

  export default Chat;




/*
import { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat`, { withCredentials: true });
        console.log(response.data);
        setChats(response.data);
        console.log(chats);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading chats...</div>
      ) : (
        <>
          {chats.length > 0 ? (
            chats.map(chat => (
              <div key={chat._id}>{chat.chatName}</div>
            ))
          ) : (
            <div>No chats available</div>
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
*/