import { useAuthContext } from "../context/AuthContext";

//Keine Self-Ratings in Datenbank? + evtl. Minitext zu Skills/Interests

const ProfilePage = () => {

  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className="flex flex-col md:flex-row mt-20">
      {/* Profile Picture and Personal Statement */}
      <div className="md:w-1/4">
        <div className="flex flex-col items-center">
          <img
            className="rounded-full w-64 h-64 mb-4"
            src={user.imgUrl}
            alt="Profile Picture"
          />
          <p className="text-center">{user.firstName}</p>
        </div>
      </div>

      {/* Other Frames */}
      <div className="md:w-3/4">
        <div className="grid grid-cols-2 gap-4">
          {/* Frame 1 */}
          <div className="bg-gray-200 p-4">
            <h3 className="font-bold">Interested in learning</h3>
          {user.interests.map((interest, index) => (<p key={index}>{interest.name}</p>))}
      
          </div>
          {/* Frame 2 */}
          <div className="bg-gray-200 p-4">
          <h3 className="font-bold">Playing</h3>
            {user.skills.map((skill, index) => (<p key={index}>{skill.name}</p>))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
