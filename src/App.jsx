import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Layout,
  Login,
  NotFound,
  ProtectedRoute,
  Register,
  Dashboard,
  SetupProfile,
  ProfilePage,
  Chat,
  Map,
  Matching,
  Skills
} from './pages';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='auth' element={<ProtectedRoute />}>
            <Route path='profilesetup' element={<SetupProfile />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile/:id' element={<ProfilePage />} />
            <Route path='chat' element={<Chat />} />
            <Route path='map' element={<Map />} />
            <Route path='matching' element={<Matching />} />
            <Route path='skills' element={<Skills />} />

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
