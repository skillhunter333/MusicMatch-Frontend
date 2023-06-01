import { MdClose } from "react-icons/md";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <div className="inline-flex items-center px-2 py-1 rounded-lg m-1 mb-2 bg-purple-500 text-white text-sm cursor-pointer" onClick={handleFunction}>
      <span className="mr-1">{user.name}</span>
      {admin === user._id && <span className="text-xs">(Admin)</span>}
      <MdClose className="w-4 h-4 ml-1" />
    </div>
  );
};

export default UserBadgeItem;
