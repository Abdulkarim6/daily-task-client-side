import React from 'react';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Navber from '../../components/Navber/Navber';

const Main = () => {
    return (
        <div className='min-h-screen'>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;