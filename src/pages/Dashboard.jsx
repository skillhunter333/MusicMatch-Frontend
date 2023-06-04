import { useNavigate } from 'react-router-dom';
import { HiChatAlt2, HiMap, HiOutlineStar, HiSparkles } from 'react-icons/hi';
import { HiUserCircle } from "react-icons/hi2";
import { useAuthContext } from "../context/AuthContext";
import { SlRocket } from "react-icons/sl"


const Dashboard = () => {
const navigate = useNavigate();

const { user } = useAuthContext();

  return (
    <>
    
      <div className='p-1 flex flex-col items-center'>
              <h1 className='text-3xl font-semibold mb-8'>Dashboard</h1>
              <h2 className='text-lg font-thin mb-12'>
              Chats | People nearby (maps) | Matching | Favourites (bookmarked people)
              </h2>
      </div>


              <div className="flex flex-wrap gap-y-4 gap-x-4 justify-center">
                    <div>
                      <button onClick={() => navigate('/auth/chat')} className="w-64 flex items-center justify-center  h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
                        <HiChatAlt2 />
                      </button>
                    </div>
                    <div>
                      <button onClick={() => navigate('/auth/map')} className="w-64 flex items-center justify-center  h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
                        <HiMap />
                      </button>
                    </div>
                    <div>
                      <button onClick={() => navigate('/auth/matching')} className=" w-64 flex items-center justify-center  h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
                        <HiOutlineStar />
                      </button>
                    </div>
                      <div>
                      <button className="w-64 flex items-center justify-center h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
                        <HiSparkles />
                      </button>
                    </div>
                    <div>
                      <button onClick={() => navigate(`/auth/profile/${user._id}`)} className="w-64 flex items-center justify-center flex-1 h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
                        <HiUserCircle />
                      </button>
                    </div>
                    <div>
                      <button onClick={() => navigate(`/auth/skills`)} className="w-64 flex items-center justify-center flex-1 h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
                        <SlRocket />
                      </button>
                    </div>  
              </div>
      </>
  );
};

export default Dashboard;


