import { useAuthContext } from "../context/AuthContext";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import getUserById from '../utils.js/getUserById'

//Keine Self-Ratings in Datenbank? + evtl. Minitext zu Skills/Interests

const ProfilePage = () => {
  const { id } = useParams();
  //user is based on params id
  const [user, setUser] = useState(null)

  useEffect(()=>{
    async function getUser(){
      try {
        const user = await getUserById(id)
        setUser(user)
      } catch (error) {
        console.log(error)
      }
    }

    getUser()
  },[])



  return (
    <div className="flex flex-col md:flex-row mt-20">
      {/* Profile Picture and Personal Statement */}
      <div className="md:w-1/4">
        <div className="flex flex-col items-center">
          <img
            className="rounded-full w-64 h-64 mb-4"
            src="https://res.cloudinary.com/lessondovienna/image/upload/f_auto,q_auto,b_auto:predominant,c_pad,g_center,e_gradient_fade:symmetric_pad,x_30,w_2560,h_1422/uploads/asgjn8piq1cjngjx70uv"
            alt="Profile Picture"
          />
          <p className="text-center">{user && user.firstName}</p>
        </div>
      </div>

      {/* Other Frames */}
      <div className="md:w-3/4">
        <div className="grid grid-cols-2 gap-4">
          {/* Frame 1 */}
          <div className="bg-gray-200 p-4">
            <h3 className="font-bold">Interested in learning</h3>
          {user && user.interests.map((interest, index) => (<p key={index}>{interest.name}</p>))}
      
          </div>
          {/* Frame 2 */}
          <div className="bg-gray-200 p-4">
          <h3 className="font-bold">Playing</h3>
            {user && user.skills.map((skill, index) => (<p key={index}>{skill.name}</p>))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
