import { useNavigate } from 'react-router-dom';
import { HiChatAlt2, HiMap, HiOutlineStar, HiSparkles } from 'react-icons/hi';


const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <main className='w-full flex flex-col items-center mt-[-1px] dark:bg-slate-700 h-fit'>
      <div className='w-fit mt-28 p-4 flex flex-col items-center'>
        <h1 className='text-3xl font-semibold mb-8'>Dashboard</h1>
        <h3 className='text-lg font-thin mb-12'>
        Chats | People nearby (maps) | Matching | Favourites (bookmarked people)
        </h3>
        <div className="flex flex-col items-center justify-center">

      <div className="flex space-x-4">
        <button onClick={() => navigate('/auth/chat')} className="w-64 flex items-center justify-center flex-1 h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
          <HiChatAlt2 />
        </button>
        <button onClick={() => navigate('/auth/map')} className="w-64 flex items-center justify-center flex-1 h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
          <HiMap />
        </button>
        <button className=" w-64 flex items-center justify-center flex-1 h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
          <HiOutlineStar />
        </button>
        <button className="w-64 flex items-center justify-center flex-1 h-32 bg-zinc-500 text-white text-4xl rounded-lg shadow-lg">
          <HiSparkles />
        </button>
      </div>
    </div>
      </div>
    </main>
  );
};

export default Dashboard;
