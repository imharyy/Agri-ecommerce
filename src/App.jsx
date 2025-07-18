import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/Common/ErrorBoundary';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import ProductList from './components/Client/ProductList';
import ProductDetails from './components/Client/ProductDetails';
import Cart from './components/Client/Cart';
import Checkout from './components/Client/Checkout';
import OrderHistory from './components/Client/OrderHistory';
import BlogList from './components/Client/BlogList';
import BlogPost from './components/Client/BlogPost';
import CropPrices from './pages/CropPrices';
import Contact from './components/Client/Contact';
import PlantDisease from './components/ML/PlantDisease';
import SoilRecommendation from './components/ML/SoilRecommendation';
import EditBlog from './components/Admin/EditBlog';
import EditOrder from './components/Admin/EditOrder';
import EditProduct from './components/Admin/EditProduct'; // Import the EditProduct component
import NotFound from './pages/NotFound';
import './styles/App.css';
import Address from './components/Client/Checkout/Address';
import Billing from './components/Client/Checkout/Billing';
import Payment from './components/Client/Checkout/Payment';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<Account />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout/address" element={<Address />} />
                <Route path="/checkout/billing" element={<Billing />} />
                <Route path="/checkout/payment" element={<Payment />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blogs/:id" element={<BlogPost />} />
                <Route path="/crop-prices" element={<CropPrices />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/plant-disease" element={<PlantDisease />} />
                <Route path="/soil-recommendation" element={<SoilRecommendation />} />
                <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
                <Route path="/admin/edit-order/:id" element={<EditOrder />} />
                <Route path="/admin/edit-product/:id" element={<EditProduct />} /> {/* Add this route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
