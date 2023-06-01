
import { useAuthContext } from '../../context/AuthContext.jsx';

const UserListItem = ({ handleFunction }) => {
  const { user } = useAuthContext();

  return (
    <div
      onClick={handleFunction}
      className="cursor-pointer bg-gray-300 hover:bg-teal-500 hover:text-white w-full flex items-center text-black px-3 py-2 mb-2 rounded-lg"
    >
      <img
        className="mr-2 h-8 w-8 rounded-full cursor-pointer"
        src={user.pic}
        alt={user.name}
      />
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs">
          <b>Email: </b>
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;
