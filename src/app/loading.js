import React from 'react';
import Navbar from '@/Components/navbar/index.js';
import spinner from '../../public/3dgifmaker59337.gif';
import Image from 'next/image';

const loadingStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
};

const gifStyles = {
  width: '200px', // Adjust the width as needed
  height: '200px', // Adjust the height as needed
};

export default function Loading() {
  return (
    <>
      <Navbar title="Loading..." />
      <div style={loadingStyles}>
        <a href="/">
          <Image src={spinner} alt="Loading..." style={gifStyles} />
        </a>
      </div>
    </>
  );
}
