import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { toastError } from '../lib/toastify';

const AuthContextObj = createContext();

export const useAuthContext = () => useContext(AuthContextObj);

export const AuthContext = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  
  const [gotCookie, setGotCookie] = useState(false);

  useEffect(() => {
    checkToken();
   
  }, [gotCookie]);
  

  async function checkToken(){
    try {
      //get authUser data
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/users/me`,
        {
          withCredentials: true,
        }
      );
      setUser(data);

      setIsAuth(true);
    } catch (error) {
      if (error.response.status !== 400) toastError(error.message);
    }
  };

  


  return (
    <AuthContextObj.Provider
      value={{ isAuth, setIsAuth, user, setUser, gotCookie, setGotCookie }}
    >
      {children}
    </AuthContextObj.Provider>
  );
};
