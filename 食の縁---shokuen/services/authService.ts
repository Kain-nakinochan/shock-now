
// import apiClient from './api'; // If using a central API client
import { User } from '../types';
import { MOCK_USER } from '../constants';

// This is a mock authentication service.
// In a real application, these functions would make API calls.

export const loginUser = async (credentials: { email?: string; password?: string }): Promise<User> => {
  console.log('Attempting login with:', credentials);
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic mock logic: if email is 'user@example.com' or no email (for demo button), succeed
      if (!credentials.email || credentials.email === MOCK_USER.email) {
        console.log('Mock login successful');
        resolve(MOCK_USER);
      } else {
        console.log('Mock login failed');
        reject(new Error('Invalid credentials (mock)'));
      }
    }, 1000);
  });
};

export const logoutUser = async (): Promise<void> => {
  console.log('Logging out user');
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Mock logout successful');
      resolve();
    }, 500);
  });
};

export const getCurrentUser = async (): Promise<User | null> => {
  console.log('Fetching current user');
  // Simulate API call, e.g., to verify a token and get user data
  return new Promise(resolve => {
    setTimeout(() => {
      // For mock, assume user is logged in if MOCK_USER is available (e.g., set by AuthContext)
      // This function would typically be used on app load to check for an existing session.
      // const token = localStorage.getItem('authToken');
      // if (token) {
      //   resolve(MOCK_USER); // Simulate token validation
      // } else {
      //   resolve(null);
      // }
      resolve(null); // Default to not logged in for this mock if not managed by context
    }, 500);
  });
};
