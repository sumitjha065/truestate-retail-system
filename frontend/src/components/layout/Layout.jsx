import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar - fixed width */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col ml-64 h-screen overflow-hidden">
                {/* Scrollable content container */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
