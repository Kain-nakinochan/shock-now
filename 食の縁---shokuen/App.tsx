
import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header'; // Changed from Navbar
import Footer from './components/Footer';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-stone-100 text-stone-800">
          <Header />
          <main className="flex-grow">
            <AppNavigator />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
