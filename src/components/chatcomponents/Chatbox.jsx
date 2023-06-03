import SingleChat from "./SingleChat";
import { ChatState } from "../../context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`flex ${
        selectedChat ? "flex" : "hidden"
      } items-start flex-col p-3 bg-orange-400 w-full md:w-68  rounded-lg`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;
