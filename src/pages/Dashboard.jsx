
const Dashboard = () => {
  return (
    <main className='w-full flex flex-col items-center mt-[-1px] dark:bg-slate-700 h-fit'>
      <div className='w-fit mt-28 p-4 flex flex-col items-center'>
        <h1 className='text-3xl font-semibold mb-8'>Dashboard</h1>
        <h3 className='text-lg font-thin mb-12'>
        People nearby (maps) | Matching | Chats | Favourites (bookmarked people)
        </h3>
        <div className="flex flex-col items-center justify-center">
      <h3 className="text-3xl font-bold mb-4">Headline</h3>
      <div className="grid grid-cols-4 gap-4">
        <button className="flex items-center justify-center h-32 w-64 bg-blue-500 text-white text-xl font-bold rounded-lg shadow-lg">
          Button 1
        </button>
        <button className="flex items-center justify-center h-32 w-64 bg-green-500 text-white text-xl font-bold rounded-lg shadow-lg">
          Button 2
        </button>
        <button className="flex items-center justify-center h-32 w-64 bg-red-500 text-white text-xl font-bold rounded-lg shadow-lg">
          Button 3
        </button>
        <button className="flex items-center justify-center h-32 w-64 bg-yellow-500 text-white text-xl font-bold rounded-lg shadow-lg">
          Button 4
        </button>
      </div>
    </div>
      </div>
    </main>
  );
};

export default Dashboard;
