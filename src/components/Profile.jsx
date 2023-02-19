import React from 'react';

const Profile = () => {
  const user = localStorage.getItem('name');
  return <div>Приветствуем, {user}</div>;
};

export default Profile;
