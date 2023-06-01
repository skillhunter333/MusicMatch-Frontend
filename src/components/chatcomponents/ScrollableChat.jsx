import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./ChatLogics";
import { useAuthContext } from "../../context/AuthContext";

const ScrollableChat = ({ messages }) => {
  const { user } = useAuthContext();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div className="flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <div className="flex items-center">
                <div className="relative">
                  <img
                    className="h-8 w-8 rounded-full cursor-pointer"
                    src={m.sender.imgUrl}
                    alt={m.sender.firstName}
                  />
                  <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full bg-green-400"></span>
                </div>
                <div className="ml-1">
                  <div className="text-xs">{m.sender.firstName}</div>
                </div>
              </div>
            )}
            <span
              className={`${
                m.sender._id === user._id ? "bg-blue-200" : "bg-green-200"
              } ${
                isSameSenderMargin(messages, m, i, user._id) ? "ml-2" : "ml-10"
              } ${
                isSameUser(messages, m, i, user._id) ? "mt-2" : "mt-10"
              } rounded-lg py-1 px-3 max-w-75%`}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
