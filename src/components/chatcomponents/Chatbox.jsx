import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div className={`flex ${selectedChat ? 'flex' : 'hidden'} items-center flex-col p-3 bg-white w-full md:w-68 border-1 border-gray-300 rounded-lg`}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  
  
    </div>

    
      
  );
};

export default Chatbox;
