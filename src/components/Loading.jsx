import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className='flex justify-center'>
      <FaSpinner className='spinner mt-48 animate-spin' size={'3em'} />
    </div>
  );
};

export default Loading;
