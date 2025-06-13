
import React from 'react';
import { Link } from 'react-router-dom';
import { Producer } from '../types';
import { APP_ROUTES } from '../constants';

interface ProducerCardProps {
  producer: Producer;
}

// UsersIcon might not be needed if follower count is removed, but keeping it for now in case it's used elsewhere or for future features.
// If it's confirmed to be unused after this change, it can be removed.
const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" {...props}>
    <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path fillRule="evenodd" d="M1.5 16.5A1.5 1.5 0 0 0 3 15h14a1.5 1.5 0 0 0 1.5 1.5v2A1.5 1.5 0 0 0 17 20H3a1.5 1.5 0 0 0-1.5-1.5v-2Z" clipRule="evenodd" />
  </svg>
);


const ProducerCard: React.FC<ProducerCardProps> = ({ producer }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-stone-200 flex flex-col h-full overflow-hidden">
      {/* Header Part */}
      <div className="p-4 flex items-center space-x-3 border-b border-stone-100">
        <Link to={APP_ROUTES.PRODUCER_DETAIL(producer.id)} className="flex-shrink-0">
            <img 
                className="w-12 h-12 rounded-full object-cover border border-stone-200" 
                src={producer.profileImage} 
                alt={`${producer.name} profile`} 
            />
        </Link>
        <div>
          <Link to={APP_ROUTES.PRODUCER_DETAIL(producer.id)} className="hover:underline">
            <h3 className="text-lg font-semibold text-stone-800 group-hover:text-green-700 transition-colors">{producer.name}</h3>
          </Link>
          <p className="text-xs text-stone-500">{producer.location}</p>
        </div>
      </div>

      {/* Cover Image */}
      <Link to={APP_ROUTES.PRODUCER_DETAIL(producer.id)} className="block group">
        <img 
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
            src={producer.coverImage} 
            alt={`${producer.name} cover image`} 
        />
      </Link>

      {/* Content Part */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-md font-medium text-amber-700 mb-2">{producer.tagline}</p>
        <p className="text-stone-600 text-sm mb-4 flex-grow">{producer.storySummary.substring(0, 100)}...</p>
        
        <div className="mb-3">
          {producer.specialty.slice(0, 2).map((spec, index) => (
            <span 
                key={index} 
                className="inline-block bg-green-100 text-green-700 text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full"
            >
              {spec}
            </span>
          ))}
          {producer.specialty.length > 2 && (
            <span className="inline-block bg-stone-100 text-stone-600 text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full">
              他 +{producer.specialty.length - 2}
            </span>
          )}
        </div>
        
        {/* Follower count display removed from here */}
        
        <Link
          to={APP_ROUTES.PRODUCER_DETAIL(producer.id)}
          className="mt-auto block w-full text-center bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
          aria-label={`生産者 ${producer.name} の詳細を見る`}
        >
          もっと知る・会いに行く
        </Link>
      </div>
    </div>
  );
};

export default ProducerCard;
