
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_ROUTES, MOCK_NOTIFICATIONS } from '../constants';
import { useAuth } from '../context/AuthContext';

const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
    <path d="M15.03 3.03a.75.75 0 0 0-1.06 0l-4.5 4.5a.75.75 0 0 0 1.06 1.06l4.5-4.5a.75.75 0 0 0 0-1.06Z" />
    <path fillRule="evenodd" d="M2.5 1A1.5 1.5 0 0 0 1 2.5v1A1.5 1.5 0 0 0 2.5 5h.291l-2.094 2.094a.75.75 0 0 0 1.06 1.06L4.03 5.879l-.274.274a.75.75 0 0 0 1.06 1.06L6.08 6.05l.274.274a.75.75 0 0 0 1.06 1.06L8.677 6.12l-.274.274a.75.75 0 0 0 1.06 1.06L10.728 6.2l.274.274a.75.75 0 1 0 1.06-1.06L10.835 4.15l.272-.273a.75.75 0 0 0-1.06-1.06L8.784 4.08l-.272-.273a.75.75 0 0 0-1.06-1.06L6.188 4.01l-.272-.273a.75.75 0 0 0-1.06-1.06L2.79 4.743H2.5A1.5 1.5 0 0 0 1 3.5v-1A1.5 1.5 0 0 0 2.5 1Z" clipRule="evenodd" />
    <path d="M7.56 12.06a.75.75 0 0 1 .681.045l4.588 2.294a.75.75 0 0 1 0 1.352l-4.588 2.294a.75.75 0 0 1-1.025-.97l1.018-3.052-1.018-3.053a.75.75 0 0 1 .344-1.08Z" />
    <path d="M15.825 8.01a.75.75 0 0 1 .356.626l-.99 4.953a.75.75 0 1 1-1.482-.296l.99-4.953a.75.75 0 0 1 1.126-.33Z" />
  </svg>
);

const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
    <path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6ZM8.25 4.015A3.001 3.001 0 0 1 10 3a3 3 0 0 1 1.75.985V8a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1-.75-.75V4.015Z" />
    <path d="M10 18a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 10 18Z" />
  </svg>
);

const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
</svg>
);


const Header: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const unreadNotificationsCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length; // Mock count

  const handleLogout = () => {
    logout();
    navigate(APP_ROUTES.HOME);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-stone-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to={APP_ROUTES.HOME} className="flex items-center space-x-2 text-2xl font-bold text-green-700 hover:text-green-800 transition-colors">
          <LeafIcon className="w-8 h-8"/>
          <span>食の縁</span>
        </Link>
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link to={APP_ROUTES.HOME} className="text-stone-600 hover:text-green-700 transition-colors font-medium">
            ホーム
          </Link>
          <Link to={APP_ROUTES.PRODUCERS_LIST} className="text-stone-600 hover:text-green-700 transition-colors font-medium">
            生産者一覧
          </Link>
          
          {isAuthenticated && currentUser && (
            <>
              <Link to={APP_ROUTES.NOTIFICATIONS} className="relative text-stone-600 hover:text-green-700 transition-colors">
                <BellIcon className="w-6 h-6" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </Link>
              <div className="flex items-center space-x-2">
                 {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover"/>
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-stone-500" />
                  )}
                <span className="text-sm font-medium text-stone-700 hidden sm:inline">{currentUser.name}</span>
                <button 
                  onClick={handleLogout}
                  className="text-sm text-stone-600 hover:text-green-700 transition-colors font-medium"
                  aria-label="ログアウト"
                >
                  ログアウト
                </button>
              </div>
            </>
          )}
          {!isAuthenticated && (
            <Link to={APP_ROUTES.LOGIN} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
              ログイン
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
