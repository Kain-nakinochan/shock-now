
import React from 'react';
import { Link } from 'react-router-dom';
import { Notification } from '../types';
import { APP_ROUTES } from '../constants'; // For default link

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const Icon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
    switch (type) {
      case 'new_post':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
      case 'reservation_update':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
      case 'system':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
  };

  const notificationContent = (
    <div className={`flex items-start space-x-4 p-4 border border-stone-200 rounded-lg transition-colors duration-200 ${notification.read ? 'bg-white hover:bg-stone-50' : 'bg-green-50 hover:bg-green-100'}`}>
      <div className="flex-shrink-0 pt-1">
        <Icon type={notification.type} />
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-stone-800">{notification.title}</h4>
        <p className="text-sm text-stone-600">{notification.message}</p>
        <p className="text-xs text-stone-400 mt-1">
          {new Date(notification.createdAt).toLocaleString('ja-JP')}
        </p>
      </div>
      {!notification.read && (
        <div className="flex-shrink-0 self-center">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block" aria-label="未読"></span>
        </div>
      )}
    </div>
  );

  if (notification.linkTo) {
    return <Link to={notification.linkTo} className="block">{notificationContent}</Link>;
  }
  return <div className="block">{notificationContent}</div>;
};

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  if (!notifications || notifications.length === 0) {
    return <p className="text-stone-600 text-center py-8">お知らせはありません。</p>;
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationList;
