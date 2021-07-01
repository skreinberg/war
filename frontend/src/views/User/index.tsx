import React, { useEffect, useState } from 'react';
import Navbar from '../../components/organisms/Navbar';
import { getUsers } from '../../utils/user';

const User = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const run = async () => {
      const users = await getUsers();
      setUsers(users);
      console.log(users);
    };

    run();
  }, []);
  return (
    <div className='w-4/5 mx-auto pt-12'>
      <Navbar />
      <div className='flex'>
        <p className='text-3xl w-1/12'>Users</p>
        <p className='text-3xl w-1/12'>Record</p>
      </div>
      <div className='space-y-2 mt-4'>
        {users.map((user: any) => (
          <div className='flex'>
            <p className='text-lg w-1/12'>{user.user.name}</p>
            <p className='text-lg w-1/12'>
              {user.wins.total} - {user.losses.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
