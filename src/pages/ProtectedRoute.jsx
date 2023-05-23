import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuth } = useAuthContext();
  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
