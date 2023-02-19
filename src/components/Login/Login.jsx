import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setAuth, users }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const errorAuth = 'Имя пользователя или пароль введены не верно';
  const handleLogin = (e) => setLogin(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const loginSubmit = (e) => {
    e.preventDefault();
    const resultLogin = users.filter(
      (user) => user.login === login && user.password === password
    );
    console.log(resultLogin.length);
    if (resultLogin.length) {
      navigate('/profile');
      setAuth(true);
      localStorage.clear();
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('name', resultLogin[0].name);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 3000);
      setAuth(false);
    }
    setLogin('');
    setPassword('');
  };
  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={loginSubmit}>
        <h1>Авторизуйтесь:</h1>
        <label htmlFor="login">Введите логин </label>
        <input
          name="login"
          type="text"
          id="login"
          placeholder="Ваш логин"
          value={login}
          onChange={handleLogin}
        />
        <label htmlFor="password">Введите пароль </label>
        <input
          name="password"
          type="text"
          id="password"
          placeholder="Ваш пароль"
          value={password}
          onChange={handlePassword}
        />
        {authError && <div className="error">{errorAuth}</div>}
        <button type="submit" className="button">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Login;
