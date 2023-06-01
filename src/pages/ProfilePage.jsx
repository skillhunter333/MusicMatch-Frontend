import { useAuthContext } from "../context/AuthContext";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import getUserById from '../utils.js/getUserById'
import axios from 'axios'

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

  
  async function handleDeleteSkill(event){
    console.log('handleDeleteSkill')

    const skill = event.target.parentElement.parentElement.firstChild.firstChild.textContent

    console.log('delete skill: ' + skill)
    
      
      try {
        
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/users/me/skills/delete`,{
            skill: skill
          },
          {
            withCredentials: true,            
          }
        );
      
        console.log(data)
          
        
      } catch (error) {
        if (error.response.status !== 400) toastError(error.message);
        console.log(error)
      }
  }


  //
  return (
    //main container
    <div className="flex gap-4 flex-col ">

      {/*ROW(1) row with img, name and description*/}
      <div className="flex gap-4 h-64 bg-yellow-400">

         {/*COL column with image*/}
       
          <img
            className="rounded-full w-64 h-64 mb-4"
            src={user.imgUrl}
            alt="Profile Picture"
          />
       

        {/*COL column with name and description*/}
        <div className="flex flex-col  gap-4 bg-slate-400">
          {/*ROW with first and lastname*/}
          {user && 
            <div className="flex h-8 bg-slate-500">
              <p className="text-center">{user.firstName?user.firstName:'Vorname'}</p>
              <p className="text-center">{user.lastName?user.lastName:'Nachname'}</p>
            </div>
            }
          <div className="h-max bg-slate-300">
            <p>{user && user.userDescription}</p>
          </div>
        </div>
          
      </div>

      {/* ROW(2) second with interests */}
          
          <div className="flex flex-col gap-2 bg-gray-200 p-4 ">
          <h2 className="font-bold">Interessen</h2>
          {/* ROW  for single interests*/}
          {user && user.interests.map((interest, index) => (
            <div key={index} className="flex justify-between bg-slate-400">
              <div className="flex ">
                <p className="w-40 bg-green-400">{interest.name}</p>
                <p>{interest.description}</p>
              </div>
              <div>
                <button className="bg-orange-400 w-12"> EDIT </button>
                <button className="bg-red-500 w-8"> X </button>
              </div>
            </div>
          ))}
          </div>

       {/* ROW(2) second with interests */}
          
       <div className="flex flex-col gap-2 bg-gray-200 p-4 ">
          <h2 className="font-bold">Fähigkeiten</h2>
          {/* ROW  for single interests*/}
          {user && user.skills.map((skill, index) => (
            <div key={index} className="flex justify-between bg-slate-400">
              <div className="flex ">
                <p className="w-40 bg-green-400">{skill.name}</p>
                <p>{skill.description}</p>
              </div>
              <div>
              <button className="bg-orange-400 w-12"> EDIT </button>
              <button onClick={handleDeleteSkill} className="bg-red-500 w-8"> X </button>
              </div>
            </div>
          ))}
          </div>
    </div>
  );
};

export default ProfilePage;
