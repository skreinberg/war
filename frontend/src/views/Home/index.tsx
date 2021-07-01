import React, { useState } from 'react';
import Button from '../../components/atoms/Button';
import PlayGame from '../../components/organisms/PlayGame';
import Navbar from '../../components/organisms/Navbar';

function App() {
  const [mode, setMode] = useState('before');

  return (
    <div className='w-4/5 mx-auto pt-12'>
      <Navbar />

      {mode === 'before' ? (
        <div
          className='flex absolute left-1/2 top-1/2'
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <Button
            className='mx-auto bg-black text-white px-12 py-4 hover:scale-110 transform transition'
            onClick={() => setMode('after')}
          >
            <p className='text-2xl'>Deal</p>
          </Button>
        </div>
      ) : (
        <PlayGame setMode={setMode} />
      )}
    </div>
  );
}

export default App;
