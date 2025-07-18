import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content" style={{ minHeight: 'calc(100vh - 160px)', paddingTop: '20px' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;