
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { APP_ROUTES } from '../constants';
import SectionTitle from '../components/SectionTitle';

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(); // Calls the mock login function from AuthContext
    navigate(APP_ROUTES.HOME); // Redirect to home after login
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-250px)]">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md text-center">
        <SectionTitle>ログイン</SectionTitle>
        <p className="text-stone-600 mb-8">
          食の縁へようこそ！ログインして、さらに豊かな食の体験をお楽しみください。
        </p>
        {/* In a real app, you'd have email/password fields here */}
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        >
          デモユーザーとしてログイン
        </button>
        <p className="mt-6 text-sm text-stone-500">
          アカウントをお持ちでないですか？ 現在はデモ運用のため、どなたでも上記ボタンからログインできます。
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
