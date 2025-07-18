import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import AddProduct from '../components/Admin/AddProduct';
import AddBlog from '../components/Admin/AddBlog';
import AdminProductList from '../components/Admin/AdminProductList';
import AdminBlogList from '../components/Admin/AdminBlogList'; // Add this import
import AdminOrders from '../components/Admin/AdminOrders';
import '../styles/Admin.css';

function AdminDashboard() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalBlogs: 0,
    totalOrders: 0,
    newOrders: 0,
    inTransitOrders: 0,
    deliveredOrders: 0
  });

  useEffect(() => {
    if (!user || role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        
        const [productsSnapshot, blogsSnapshot, ordersSnapshot] = await Promise.all([
          getDocs(collection(db, 'products')),
          getDocs(collection(db, 'blogs')),
          getDocs(collection(db, 'orders'))
        ]);

        const totalProducts = productsSnapshot.size;
        const totalBlogs = blogsSnapshot.size;
        
        const orders = ordersSnapshot.docs.map(doc => doc.data());
        const totalOrders = orders.length;
        const newOrders = orders.filter(order => order.status === 'pending').length;
        const inTransitOrders = orders.filter(order => order.status === 'in-transit').length;
        const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

        setStats({
          totalProducts,
          totalBlogs,
          totalOrders,
          newOrders,
          inTransitOrders,
          deliveredOrders
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        alert('Error loading dashboard data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, role, navigate]);

  const handleLogout = async () => {
    try {
      const { signOut } = await import('firebase/auth');
      const { auth } = await import('../firebase');
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const renderTabContent = () => {
    if (loading && activeTab === 'overview') {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="admin-overview">
            <div className="overview-header">
              <h3>Dashboard Overview</h3>
              <p className="overview-subtitle">
                Welcome back! Here's what's happening with your store.
              </p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card products">
                <div className="stat-icon">📦</div>
                <div className="stat-content">
                  <h4>Total Products</h4>
                  <p className="stat-number">{stats.totalProducts}</p>
                </div>
              </div>
              
              <div className="stat-card blogs">
                <div className="stat-icon">📝</div>
                <div className="stat-content">
                  <h4>Total Blogs</h4>
                  <p className="stat-number">{stats.totalBlogs}</p>
                </div>
              </div>
              
              <div className="stat-card orders">
                <div className="stat-icon">📋</div>
                <div className="stat-content">
                  <h4>Total Orders</h4>
                  <p className="stat-number">{stats.totalOrders}</p>
                </div>
              </div>
              
              <div className="stat-card new-orders">
                <div className="stat-icon">🆕</div>
                <div className="stat-content">
                  <h4>New Orders</h4>
                  <p className="stat-number">{stats.newOrders}</p>
                  {stats.newOrders > 0 && <span className="stat-alert">Needs Attention</span>}
                </div>
              </div>
              
              <div className="stat-card in-transit">
                <div className="stat-icon">🚚</div>
                <div className="stat-content">
                  <h4>In Transit</h4>
                  <p className="stat-number">{stats.inTransitOrders}</p>
                </div>
              </div>
              
              <div className="stat-card delivered">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h4>Delivered</h4>
                  <p className="stat-number">{stats.deliveredOrders}</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h4>Quick Actions</h4>
              <div className="action-buttons">
                <button 
                  className="action-btn primary"
                  onClick={() => setActiveTab('add-product')}
                >
                  ➕ Add New Product
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => setActiveTab('add-blog')}
                >
                  📝 Create Blog Post
                </button>
                <button 
                  className="action-btn tertiary"
                  onClick={() => setActiveTab('orders')}
                >
                  📋 Manage Orders
                </button>
              </div>
            </div>
          </div>
        );
      case 'add-product':
        return <AddProduct />;
      case 'products':
        return <AdminProductList />;
      case 'add-blog':
        return <AddBlog />;
      case 'blogs':
        return <AdminBlogList />; // This will now work
      case 'orders':
        return <AdminOrders />;
      default:
        return (
          <div className="error-state">
            <h3>Page Not Found</h3>
            <p>The requested section could not be found.</p>
            <button onClick={() => setActiveTab('overview')} className="btn btn-primary">
              Go to Dashboard
            </button>
          </div>
        );
    }
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (role !== 'admin') {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this admin panel.</p>
          <p>Please contact your administrator if you believe this is an error.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-header">
          <div className="admin-logo">
            <h2>🌾 Admin Panel</h2>
          </div>
          <div className="admin-user">
            <p className="user-email">{user.email}</p>
            <span className="user-role">Administrator</span>
          </div>
        </div>
        
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </button>
          
          <div className="nav-section">
            <h4 className="section-title">Products</h4>
            <button
              className={`nav-item ${activeTab === 'add-product' ? 'active' : ''}`}
              onClick={() => setActiveTab('add-product')}
            >
              <span className="nav-icon">➕</span>
              <span className="nav-text">Add Product</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <span className="nav-icon">📦</span>
              <span className="nav-text">Manage Products</span>
            </button>
          </div>

          <div className="nav-section">
            <h4 className="section-title">Content</h4>
            <button
              className={`nav-item ${activeTab === 'add-blog' ? 'active' : ''}`}
              onClick={() => setActiveTab('add-blog')}
            >
              <span className="nav-icon">➕</span>
              <span className="nav-text">Add Blog</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              <span className="nav-icon">📝</span>
              <span className="nav-text">Manage Blogs</span>
            </button>
          </div>

          <div className="nav-section">
            <h4 className="section-title">Orders</h4>
            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="nav-icon">📋</span>
              <span className="nav-text">Order Management</span>
              {stats.newOrders > 0 && (
                <span className="nav-badge">{stats.newOrders}</span>
              )}
            </button>
          </div>

          <div className="nav-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <span className="nav-icon">🚪</span>
              <span className="nav-text">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      <div className="admin-content">
        <div className="content-wrapper">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
