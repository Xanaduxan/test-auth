import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../features/userslice';
import { useAppDispatch } from '../../store';

import './Registration.css';

const Registration = ({ auth, setAuth, users }) => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [statusLogin, setStatusLogin] = useState(false);
  const [statusPassword, setStatusPassword] = useState(false);
  const errorLogin = 'Пользователь с таким логином уже зарегистрирован';

  const errorPassword = 'Введенные пароли не совпадают';
  const nameHandler = (e) => setName(e.target.value);
  const loginHandler = (e) => setLogin(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const repeatPasswordHandler = (e) => setRepeatPassword(e.target.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formSubmit = (e) => {
    e.preventDefault();
    if (users.some((user) => user.login === login)) {
      setStatusLogin(true);
      setTimeout(() => setStatusLogin(false), 3000);
    }
    if (password !== repeatPassword) {
      setStatusPassword(true);
      setTimeout(() => setStatusPassword(false), 3000);
    }
    if (
      users.every((user) => user.login !== login) &&
      password === repeatPassword &&
      password.length > 0
    ) {
      setAuth(true);
      dispatch(addUser({ name, login, password }));
    }
    setName('');
    setLogin('');
    setPassword('');
    setRepeatPassword('');
  };
  return (
    <div className="registration-form-container">
      <form className="registration-form" onSubmit={formSubmit}>
        <h1>Зарегистрируйтесь: </h1>
        <label htmlFor="name">Введите имя </label>
        <input
          name="name"
          type="text"
          id="name"
          placeholder="Ваше имя"
          value={name}
          onChange={nameHandler}
        />
        <label htmlFor="login">Введите логин </label>
        <input
          name="login"
          type="text"
          id="login"
          placeholder="Ваш логин"
          value={login}
          onChange={loginHandler}
        />
        {statusLogin && <div className="error">{errorLogin}</div>}
        <label htmlFor="password">Введите пароль </label>
        <input
          name="password"
          type="password"
          id="password"
          placeholder="Ваш пароль"
          value={password}
          onChange={passwordHandler}
        />
        <label htmlFor="repeat-password">Повторите пароль </label>
        <input
          name="repeat-password"
          type="password"
          id="repeat-password"
          placeholder="Повторите пароль"
          value={repeatPassword}
          onChange={repeatPasswordHandler}
        />
        {statusPassword && <div className="error">{errorPassword}</div>}
        {auth && (
          <>
            <div className="success">Поздравляем с успешной регистрацией!</div>
            <button type="button" onClick={() => navigate('/login')}>
              Login
            </button>
          </>
        )}
        {!auth && <button type="submit">Отправить</button>}
      </form>
    </div>
  );
};

export default Registration;
