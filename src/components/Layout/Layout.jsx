import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/userslice';
import './Layout.css';

const Layout = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  const localAuth = localStorage.getItem('isAuth');
  const dispatch = useDispatch();

  const toLogout = (e) => {
    e.preventDefault();
    setAuth(() => false);
    dispatch(logoutUser());
    navigate('/');
  };
  const toProfile = (e) => {
    e.preventDefault();
    if (!(auth || localAuth)) {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };
  const toRegistration = (e) => {
    e.preventDefault();
    if (auth || localAuth) {
      navigate('/profile');
    } else {
      navigate('/registration');
    }
  };

  return (
    <>
      <header>
        <Link to="/">На главную</Link>
        <Link to="/registration" onClick={toRegistration}>
          Регистрация
        </Link>
        <Link to="/profile" onClick={toProfile}>
          Профиль
        </Link>

        <Link to="/login">Логин</Link>
        {(auth || localAuth) && (
          <>
            <Link to="/logout" onClick={toLogout}>
              Выйти
            </Link>
          </>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
