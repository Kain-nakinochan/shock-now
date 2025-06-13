import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { User } from '../types';
import { MOCK_USER, MOCK_PRODUCERS } from '../constants'; // MOCK_PRODUCERSをインポート

interface AuthContextType {
  currentUser: User | null;
  login: () => void; // Simulate login
  logout: () => void; // Simulate logout
  isAuthenticated: boolean;
  toggleFollowProducer: (producerId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = () => {
    setCurrentUser(MOCK_USER);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCurrentUser(MOCK_USER);
    }
  }, []);

  const isAuthenticated = !!currentUser || !!localStorage.getItem('token');

  const toggleFollowProducer = useCallback((producerId: string) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return null;

      const isCurrentlyFollowing = prevUser.followedProducers.includes(producerId);
      const updatedFollowedProducers = isCurrentlyFollowing
        ? prevUser.followedProducers.filter(id => id !== producerId)
        : [...prevUser.followedProducers, producerId];

      // Update MOCK_PRODUCERS followerCount (direct mutation for mock)
      const producerIndex = MOCK_PRODUCERS.findIndex(p => p.id === producerId);
      if (producerIndex !== -1) {
        if (isCurrentlyFollowing) {
          MOCK_PRODUCERS[producerIndex].followerCount = Math.max(0, MOCK_PRODUCERS[producerIndex].followerCount - 1);
        } else {
          MOCK_PRODUCERS[producerIndex].followerCount += 1;
        }
      }
      
      return {
        ...prevUser,
        followedProducers: updatedFollowedProducers,
      };
    });
