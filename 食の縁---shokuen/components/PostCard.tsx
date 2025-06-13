
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { APP_ROUTES } from '../constants';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const summary = post.content.substring(0, 100) + (post.content.length > 100 ? '...' : '');
  const postDate = new Date(post.createdAt).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });

  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-stone-200 h-full">
      {/* Post Header */}
      <div className="p-4 flex items-center space-x-3 border-b border-stone-100">
        {post.producerProfileImage && (
          <Link to={APP_ROUTES.PRODUCER_DETAIL(post.producerId)}>
            <img 
              className="w-10 h-10 rounded-full object-cover border border-stone-200" 
              src={post.producerProfileImage} 
              alt={`${post.producerName} profile`} 
            />
          </Link>
        )}
        <div>
          <Link to={APP_ROUTES.PRODUCER_DETAIL(post.producerId)} className="hover:underline">
            <h4 className="text-sm font-semibold text-stone-700">{post.producerName}</h4>
          </Link>
          <p className="text-xs text-stone-500">{postDate}</p>
        </div>
      </div>
      
      {/* Optional Image */}
      {post.imageUrl && (
        <Link to={APP_ROUTES.POST_DETAIL(post.id)} className="block group">
          <img 
            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105" 
            src={post.imageUrl} 
            alt={post.title} 
          />
        </Link>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={APP_ROUTES.POST_DETAIL(post.id)} className="hover:text-green-700">
          <h3 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-green-700 transition-colors">{post.title}</h3>
        </Link>
        <p className="text-stone-600 text-sm mb-4 flex-grow">{summary}</p>
        
        <div className="mt-auto flex justify-between items-center">
            {post.likes !== undefined && (
                 <span className="text-sm text-stone-500">❤️ {post.likes}</span>
            )}
            <Link
            to={APP_ROUTES.POST_DETAIL(post.id)}
            className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline"
            aria-label={`投稿「${post.title}」の詳細を見る`}
            >
            続きを読む &rarr;
            </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
