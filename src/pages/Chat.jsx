import Chatbox from "../components/chatcomponents/Chatbox";
import MyChats from "../components/chatcomponents/MyChats";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useAuthContext();

  return (
    <>
      {/* render mychats and the chatbox which will render the actual chat */}

      <div>
        <div className="flex justify-between w-full h-[95vh] p-10 bg-slate-600 mt-12">
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
