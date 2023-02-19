import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Main from './components/Main';
import Profile from './components/Profile';
import Registration from './components/Registration/Registration';
import { useSelector } from 'react-redux';

function App() {
  const [auth, setAuth] = useState(false);
  const { users } = useSelector((state) => state.users);

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout auth={auth} setAuth={setAuth} users={users} />}
      >
        <Route index element={<Main />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="registration"
          element={<Registration auth={auth} setAuth={setAuth} users={users} />}
        />
        <Route
          path="login"
          element={<Login setAuth={setAuth} users={users} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
