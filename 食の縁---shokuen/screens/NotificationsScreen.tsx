
import React from 'react';
import { Notification } from '../types';
import NotificationList from '../components/NotificationList';
import SectionTitle from '../components/SectionTitle';

interface NotificationsScreenProps {
  notifications: Notification[];
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ notifications }) => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionTitle>お知らせ</SectionTitle>
      {notifications.length > 0 ? (
        <NotificationList notifications={notifications} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="mt-4 text-xl text-stone-600">新しいお知らせはありません。</p>
            <p className="mt-2 text-sm text-stone-500">アクティビティがあるとここに表示されます。</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsScreen;
