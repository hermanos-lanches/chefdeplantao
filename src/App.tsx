import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './src/pages/Login.tsx';
import { Register } from './src/pages/Register.tsx';
import { Terms } from './src/pages/Terms.tsx';
import { Dashboard as FreelancerDashboard } from './src/pages/freelancer/Dashboard.tsx';
import { Shifts } from './src/pages/freelancer/Shifts.tsx';
import { Wallet } from './src/pages/freelancer/Wallet.tsx';
import { Profile } from './src/pages/freelancer/Profile.tsx';
import { CheckIn } from './src/pages/freelancer/CheckIn.tsx';
import { Chat } from './src/pages/freelancer/Chat.tsx';
import { Emergency } from './src/pages/freelancer/Emergency.tsx';
import { JobDetails } from './src/pages/freelancer/JobDetails.tsx';
import { Dashboard as RestaurantDashboard } from './src/pages/restaurant/Dashboard.tsx';
import { Plans } from './src/pages/restaurant/Plans.tsx';
import { Checkout } from './src/pages/restaurant/Checkout.tsx';
import { Review } from './src/pages/restaurant/Review.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        
        {/* Freelancer Routes */}
        <Route path="/freelancer">
          <Route index element={<Navigate to="/freelancer/dashboard" replace />} />
          <Route path="dashboard" element={<FreelancerDashboard />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="shifts" element={<Shifts />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="profile" element={<Profile />} />
          <Route path="check-in" element={<CheckIn />} />
          <Route path="chat" element={<Chat />} />
          <Route path="emergency" element={<Emergency />} />
        </Route>

        {/* Restaurant Routes */}
        <Route path="/restaurant">
          <Route index element={<Navigate to="/restaurant/dashboard" replace />} />
          <Route path="dashboard" element={<RestaurantDashboard />} />
          <Route path="plans" element={<Plans />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="review" element={<Review />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;