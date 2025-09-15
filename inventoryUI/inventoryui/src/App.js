import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar'; 
import Layout from './Components/Layout';
import Dashboard from './Pages/Dashboard';
import Transaction from './Pages/Transaction';
import Category from './Pages/Category';
import Product from './Pages/Product';
import Supplier from './Pages/Supplier';
import Purchase from './Pages/Purchase';
import Sell from './Pages/Sell';
import Profile from './Pages/Profile';
import Logout from './Pages/Logout';
import Login from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <ToastContainer />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/transaction" element={<Transaction />} />
                  <Route path="/sell" element={<Sell />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/supplier" element={<Supplier />} />
                  <Route path="/purchase" element={<Purchase />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
