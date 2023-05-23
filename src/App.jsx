import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Layout,
  Login,
  NotFound,
  ProtectedRoute,
  Register,
  Dashboard,
} from './pages';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='auth' element={<ProtectedRoute />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='404' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
