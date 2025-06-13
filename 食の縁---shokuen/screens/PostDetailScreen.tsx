
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types';
import { APP_ROUTES } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import SectionTitle from '../components/SectionTitle';

interface PostDetailScreenProps {
  posts: Post[];
}

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({ posts }) => {
  const { postId } = useParams<{ postId: string }>();
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center py-10">
        <LoadingSpinner />
        <p className="text-stone-600 mt-4 text-lg">投稿を読み込んでいます...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <article className="bg-white p-6 md:p-10 rounded-xl shadow-xl max-w-3xl mx-auto">
        <header className="mb-6 border-b pb-6 border-stone-200">
          <SectionTitle className="!mb-2">{post.title}</SectionTitle>
          <div className="flex items-center space-x-3 text-sm text-stone-500">
            <Link to={APP_ROUTES.PRODUCER_DETAIL(post.producerId)} className="hover:underline flex items-center space-x-2">
              {post.producerProfileImage && <img src={post.producerProfileImage} alt={post.producerName} className="w-8 h-8 rounded-full object-cover" />}
              <span>{post.producerName}</span>
            </Link>
            <span>&bull;</span>
            <span>{new Date(post.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-auto max-h-[500px] object-contain rounded-lg mb-6 shadow" 
          />
        )}

        <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed whitespace-pre-line mb-8">
          {post.content}
        </div>
        
        <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
           <div className="text-sm text-stone-500">
             {post.likes !== undefined && (
                <span>❤️ {post.likes} いいね</span>
             )}
           </div>
          <Link
            to={APP_ROUTES.RESERVATION(post.id)}
            className="bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors text-lg shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            この商品を予約する
          </Link>
        </div>
        
        <div className="mt-12 text-center">
            <Link to={APP_ROUTES.HOME} className="text-green-600 hover:text-green-800 transition-colors font-medium hover:underline text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                他の投稿も見る
            </Link>
        </div>

      </article>
    </div>
  );
};

export default PostDetailScreen;
