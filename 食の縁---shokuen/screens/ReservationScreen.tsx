
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Post } from '../types';
import { APP_ROUTES } from '../constants';
import ReservationForm from '../components/ReservationForm';
import SectionTitle from '../components/SectionTitle';
import LoadingSpinner from '../components/LoadingSpinner';

interface ReservationScreenProps {
  posts: Post[]; // To find the post being reserved
}

const ReservationScreen: React.FC<ReservationScreenProps> = ({ posts }) => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-250px)]">
        <LoadingSpinner />
        <p className="mt-4 text-stone-600">予約対象の情報を読み込んでいます...</p>
      </div>
    );
  }

  const handleReservationSubmit = (formData: { date: string; time: string; notes: string }) => {
    // Mock submission
    console.log('Reservation submitted for post:', post.title, formData);
    alert(`「${post.title}」の予約リクエストを送信しました。\n日時: ${formData.date} ${formData.time}\n備考: ${formData.notes || 'なし'}\n\n生産者からの連絡をお待ちください。`);
    navigate(APP_ROUTES.HOME); // Redirect after mock submission
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl max-w-2xl mx-auto">
        <SectionTitle>予約リクエスト</SectionTitle>
        
        <div className="mb-8 p-4 border border-stone-200 rounded-lg bg-stone-50">
            <h3 className="text-xl font-semibold text-green-700 mb-2">{post.title}</h3>
            <p className="text-sm text-stone-600">提供者: <Link to={APP_ROUTES.PRODUCER_DETAIL(post.producerId)} className="text-amber-600 hover:underline">{post.producerName}</Link></p>
            {/* Display more post details if needed */}
        </div>

        <ReservationForm onSubmit={handleReservationSubmit} />
      </div>
    </div>
  );
};

export default ReservationScreen;
