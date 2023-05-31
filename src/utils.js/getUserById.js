import axios from 'axios'

export default async function getUserById(id){
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/users/getuser/${id}`,
        {
          withCredentials: true,
        }
      );
      return(data);
    } catch (error) {
      //if (error.response.status !== 400) toastError(error.message);
      console.log('error with getUserById')
      console.log(error)
    }
  };