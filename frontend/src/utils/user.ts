import axios from 'axios';

export const getUsers = async () => {
  const users = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`);

  return users.data;
};
