
const UserListItem = ({ user, handleFunction }) => {
  

  return (
    <div
      onClick={handleFunction}
      className="cursor-pointer bg-gray-300 hover:bg-teal-500 hover:text-white w-full flex items-center text-black px-3 py-2 mb-2 rounded-lg"
    >
      <img
        className="mr-2 h-8 w-8 rounded-full cursor-pointer"
        src={user.imgUrl}
        alt={user.firstName}
      />
      <div>
        <p className="font-semibold">{user.firstName} {user.lastName}</p>
        <p className="text-xs">
          <b>Email: </b>
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;
