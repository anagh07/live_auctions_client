import React from 'react';
import spinner from '../images/spinner.gif';
import './css/spinner.css';

const Spinner = () => {
  return (
    <div className='spinner'>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </div>
  );
};

export default Spinner;
