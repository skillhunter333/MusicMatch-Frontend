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
    <ScrollableFeed className="flex flex-col overflow-x-hidden">
      {messages &&
        messages.map((m, i) => {
          const wrapperStyles =
            m.sender._id !== user._id
              ? "text-right flex justify-end pr-2"
              : "w-fit";
          return (
            // <div className={wrapperStyles} key={m._id}>
            //   {(isSameSender(messages, m, i, user._id) ||
            //     isLastMessage(messages, i, user._id)) && (
            //     <div className="my-4 flex items-center">
            //       <img
            //         className="h-8 w-8 rounded-full cursor-pointer"
            //         src={m.sender.imgUrl}
            //         alt={m.sender.firstName}
            //       />

            //       <div className="ml-1">
            //         <div className="text-xs">{m.sender.firstName}</div>
            //       </div>
            //     </div>
            //   )}
            <div className={wrapperStyles} key={m._id}>
              {isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id) ? (
                <div className="flex flex-col items-end">
                  <div
                    className={`${
                      m.sender._id === user._id ? "bg-blue-200" : "bg-green-200"
                    } ${
                      isSameSenderMargin(messages, m, i, user._id)
                        ? "ml-2"
                        : "ml-10"
                    } ${
                      isSameUser(messages, m, i, user._id) ? "mt-2" : "mt-10"
                    } rounded-lg py-1 px-3 max-w-75%`}
                  >
                    {m.content}
                  </div>
                  <div className="my-4 flex gap-2 items-center">
                    <div className="ml-1">
                      <div className="text-xs">{m.sender.firstName}</div>
                    </div>
                    <img
                      className="h-8 w-8 rounded-full cursor-pointer"
                      src={m.sender.imgUrl}
                      alt={m.sender.firstName}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`${
                    m.sender._id === user._id ? "bg-blue-200" : "bg-green-200"
                  } ${
                    isSameSenderMargin(messages, m, i, user._id)
                      ? "ml-2"
                      : "ml-10"
                  } ${
                    isSameUser(messages, m, i, user._id) ? "mt-2" : "mt-10"
                  } rounded-lg py-1 px-3 max-w-75%`}
                >
                  {m.content}
                </div>
              )}
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
