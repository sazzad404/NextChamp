import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const RootLayout = () => {
    return (
        <div className=' min-h-screen'>
           <header>
            <Navbar></Navbar>
           </header>
           <main >
            <Outlet></Outlet>
           </main>
           <footer></footer>
        </div>
    );
};

export default RootLayout;