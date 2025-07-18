import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import ChatBot from '../Common/ChatBot';

function Layout({ children }) {
return (
    <div className="app-layout">
        <Header />
        <main className="main-content">
            {children}
        </main>
        <Footer />
        <ChatBot />
    </div>
);
}

export default Layout;