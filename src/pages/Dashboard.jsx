import { useNavigate } from "react-router-dom";
import { HiChatAlt2, HiMap, HiOutlineStar, HiSparkles } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi2";
import { useAuthContext } from "../context/AuthContext";
import { SlRocket } from "react-icons/sl";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  return (
    <div className="bg-slate-800 h-full">


        <div className="flex flex-col h-full justify-center items-center mx-2">

          <h1 className="text-4xl mb-5 text-slate-100">Dashboard</h1>
                  

            <div className="flex flex-wrap gap-y-4 gap-x-4 justify-center">

            <div onClick={() => navigate('/auth/chat')} className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50">
                      <img className="w-full h-80" src="/src/images/dashboard_chat.png" alt="Sunset in the mountains"></img>
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Chat</div>
                        <p className="text-gray-700 text-base">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                      </div>
            </div>

            <div onClick={() => navigate('/auth/map')} className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50">
                      <img className="w-full h-80" src="/src/images/dashboard_map.png" alt="Sunset in the mountains"></img>
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Map</div>
                        <p className="text-gray-700 text-base">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                      </div>
            </div>

            <div onClick={() => navigate('/auth/matching')} className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50">
                      <img className="w-full h-80" src="/src/images/logo.png" alt="Music match logo"></img>
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">MusicMatch</div>
                        <p className="text-gray-700 text-base">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                      </div>
            </div>

            <div onClick={() => navigate(`/auth/profile/${user._id}`)} className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50">
                      <img className="w-full h-80" src="/src/images/dashboard_profile.png" alt="Music match logo"></img>
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Profil</div>
                        <p className="text-gray-700 text-base">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                      </div>
            </div>

            <div onClick={() => navigate(`/auth/skills/${user._id}`)} className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-50">
                      <img className="w-full h-80" src="/src/images/dashboard_profile.png" alt="Music match logo"></img>
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Profil</div>
                        <p className="text-gray-700 text-base">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                      </div>
            </div>




               
             
               
                  <div>
                    <button onClick={() => navigate(`/auth/skills`)} className="w-64 flex items-center justify-center flex-1 h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
                      <SlRocket />
                    </button>
                  </div>  

                


            </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
