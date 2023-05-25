
const Dashboard = () => {
  return (
    <main className='w-full flex flex-col items-center mt-[-1px] dark:bg-slate-700 h-fit'>
      <div className='w-fit mt-28 p-4 flex flex-col items-center'>
        <h1 className='text-3xl font-semibold mb-8'>Dashboard</h1>
        <h3 className='text-lg font-thin mb-12'>
        People nearby (maps) | Matching | Chats | Favourites (bookmarked people)
        </h3>
      </div>
    </main>
  );
};

export default Dashboard;
