import React from 'react';
import Navbar from '../Components/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import RouteLoader from '../Components/RouteLoader';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className='flex-1'>
                <RouteLoader><Outlet></Outlet></RouteLoader>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;