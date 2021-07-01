import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex space-x-4 text-xl mb-8 border-b border-black pb-4'>
      <Link to='/'>
        <p>Play Now</p>
      </Link>
      <Link to='/user'>
        <p>Users</p>
      </Link>
    </div>
  );
};

export default Navbar;
