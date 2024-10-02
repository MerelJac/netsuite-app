import React from 'react';
import logo from '../CallOneLogo.png';

function HeaderBanner() {
  return (
    <header className="header flex bg-lightBlue p-2 justify-between justify-center">
        <img src={logo} alt='callone logo'></img>
        <div className='flex items-center px-2'>
        <a href='#' className='px-2 text-white'>Quick Order</a>
        <a href='#' className='px-2 text-white'>Login</a>
        <a href='#' className='px-2 text-white'>Register</a>
        </div>

    </header>
  );
}

export default HeaderBanner;
