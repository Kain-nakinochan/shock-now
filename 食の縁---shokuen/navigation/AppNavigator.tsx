
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import ProducersScreen from '../screens/ProducersScreen';
import ProducerDetailScreen from '../screens/ProducerDetailScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import ReservationScreen from '../screens/ReservationScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { APP_ROUTES, MOCK_PRODUCERS, MOCK_POSTS, MOCK_NOTIFICATIONS } from '../constants';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute HOC (Higher Order Component)
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }
  return children;
};


const AppNavigator: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path={APP_ROUTES.HOME} 
        element={<HomeScreen posts={MOCK_POSTS} producers={MOCK_PRODUCERS.slice(0,3)} />} // Show some producers on home too
      />
      <Route
        path={APP_ROUTES.LOGIN}
        element={<LoginScreen />}
      />
      <Route
        path={APP_ROUTES.SIGNUP}
        element={<SignupScreen />}
      />
      <Route
        path={APP_ROUTES.PRODUCERS_LIST}
        element={<ProducersScreen producers={MOCK_PRODUCERS} />}
      />
      <Route 
        path={APP_ROUTES.PRODUCER_DETAIL_PARAM} 
        element={<ProducerDetailScreen producers={MOCK_PRODUCERS} posts={MOCK_POSTS} />} 
      />
      <Route 
        path={APP_ROUTES.POST_DETAIL_PARAM}
        element={<PostDetailScreen posts={MOCK_POSTS} />}
      />

      {/* Protected Routes (Example) */}
      <Route 
        path={APP_ROUTES.RESERVATION_PARAM}
        element={
          <ProtectedRoute>
            <ReservationScreen posts={MOCK_POSTS} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={APP_ROUTES.NOTIFICATIONS}
        element={
          <ProtectedRoute>
            <NotificationsScreen notifications={MOCK_NOTIFICATIONS} />
          </ProtectedRoute>
