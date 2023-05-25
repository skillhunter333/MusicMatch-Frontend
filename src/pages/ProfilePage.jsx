import { useAuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuthContext();
  console.log(user);

 

  return (
    <main className='w-full flex flex-col items-center mt-[-1px] dark:bg-slate-700 h-fit'>
    <div className='w-fit mt-28 p-4 flex flex-col items-center'>
      <h1 className='text-3xl font-semibold mb-8'>Profile Page</h1>
      <img className='sobject-scale-down h-48 w-96' src="https://res.cloudinary.com/lessondovienna/image/upload/f_auto,q_auto,b_auto:predominant,c_pad,g_center,e_gradient_fade:symmetric_pad,x_30,w_2560,h_1422/uploads/asgjn8piq1cjngjx70uv" alt="" />

    </div>
  </main>
  );
};

export default ProfilePage;
