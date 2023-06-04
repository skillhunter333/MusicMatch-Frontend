import Chatbox from "../components/chatcomponents/Chatbox";
import MyChats from "../components/chatcomponents/MyChats";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useAuthContext();

  return (
    <>
      <div className="bg-red-400">
        {/* render mychats and the box which will render the actual chat */}

        <div>
          <div className="flex justify-between w-full h-[91.5vh] p-10 bg-slate-300">
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && (
              <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
