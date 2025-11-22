import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

// Main Pages
import Dashboard from './pages/Dashboard';
import Products from './pages/products/Products';
import ProductDetails from './pages/products/ProductDetails';
import CreateProduct from './pages/products/CreateProduct';

import Receipts from './pages/operations/Receipts';
import ReceiptDetails from './pages/operations/ReceiptDetails';
import CreateReceipt from './pages/operations/CreateReceipt';

import Deliveries from './pages/operations/Deliveries';
import DeliveryDetails from './pages/operations/DeliveryDetails';
import CreateDelivery from './pages/operations/CreateDelivery';

import Transfers from './pages/operations/Transfers';
import TransferDetails from './pages/operations/TransferDetails';
import CreateTransfer from './pages/operations/CreateTransfer';

import Adjustments from './pages/operations/Adjustments';
import AdjustmentDetails from './pages/operations/AdjustmentDetails';
import CreateAdjustment from './pages/operations/CreateAdjustment';

import MoveHistory from './pages/operations/MoveHistory';
import Warehouses from './pages/settings/Warehouses';
import Profile from './pages/Profile';
import Help from './pages/Help';

// Layout
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Products */}
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<CreateProduct />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="products/:id/edit" element={<CreateProduct />} />

        {/* Receipts */}
        <Route path="receipts" element={<Receipts />} />
        <Route path="receipts/new" element={<CreateReceipt />} />
        <Route path="receipts/:id" element={<ReceiptDetails />} />

        {/* Deliveries */}
        <Route path="deliveries" element={<Deliveries />} />
        <Route path="deliveries/new" element={<CreateDelivery />} />
        <Route path="deliveries/:id" element={<DeliveryDetails />} />

        {/* Transfers */}
        <Route path="transfers" element={<Transfers />} />
        <Route path="transfers/new" element={<CreateTransfer />} />
        <Route path="transfers/:id" element={<TransferDetails />} />

        {/* Adjustments */}
        <Route path="adjustments" element={<Adjustments />} />
        <Route path="adjustments/new" element={<CreateAdjustment />} />
        <Route path="adjustments/:id" element={<AdjustmentDetails />} />

        {/* Move History */}
        <Route path="moves" element={<MoveHistory />} />

        {/* Settings */}
        <Route path="settings/warehouses" element={<Warehouses />} />

        {/* Profile */}
        <Route path="profile" element={<Profile />} />

        {/* Help */}
        <Route path="help" element={<Help />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;

