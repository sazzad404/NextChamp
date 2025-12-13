import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <div className=' min-h-screen'>
           <header>
            <Navbar></Navbar>
           </header>
           <main >
            <Outlet></Outlet>
           </main>
           <footer>
            <Footer></Footer>
           </footer>
        </div>
    );
};

export default RootLayout;