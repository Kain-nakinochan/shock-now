
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Post, Producer } from '../types';
import { APP_ROUTES } from '../constants';
import PostCard from '../components/PostCard';
import ProducerCard from '../components/ProducerCard';
import SectionTitle from '../components/SectionTitle';
import { useAuth } from '../context/AuthContext'; // Import useAuth

interface HomeScreenProps {
  posts: Post[];
  producers: Producer[]; // Featured producers
}

const HomeScreen: React.FC<HomeScreenProps> = ({ posts, producers }) => {
  const { currentUser, isAuthenticated } = useAuth();

  const sortedPosts = useMemo(() => {
    const allPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    if (isAuthenticated && currentUser && currentUser.followedProducers.length > 0) {
      const followedPosts: Post[] = [];
      const otherPosts: Post[] = [];

      allPosts.forEach(post => {
        if (currentUser.followedProducers.includes(post.producerId)) {
          followedPosts.push(post);
        } else {
          otherPosts.push(post);
        }
      });
      return [...followedPosts, ...otherPosts];
    }
    return allPosts;
  }, [posts, currentUser, isAuthenticated]);

  const latestPosts = sortedPosts.slice(0, 3); // Show 3 latest posts based on new sorting

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 bg-gradient-to-br from-green-50 via-stone-50 to-amber-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-700 mb-6">
            食の縁
          </h1>
          <p className="text-lg md:text-xl text-stone-700 mb-8 max-w-3xl mx-auto">
            生産者の想いが届く、新しい食の体験。
          </p>
          <Link
            to={APP_ROUTES.PRODUCERS_LIST}
            className="bg-amber-500 text-white font-semibold py-3 px-10 rounded-lg hover:bg-amber-600 transition-colors text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75"
          >
            素敵な生産者を探す
          </Link>
        </div>
      </section>

      {/* Latest Posts Feed */}
      <section className="container mx-auto px-4">
        <SectionTitle>新着の投稿</SectionTitle>
        {latestPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-stone-600 text-center py-8">新しい投稿はまだありません。</p>
        )}
        {sortedPosts.length > 3 && ( // Check against sortedPosts for "see all"
            <div className="text-center mt-8">
                <Link 
                    to={APP_ROUTES.POSTS_FEED} // Assuming a dedicated feed page later
                    className="text-green-600 hover:text-green-800 font-medium hover:underline"
                >
                    すべての投稿を見る &rarr;
                </Link>
            </div>
        )}
      </section>
      
      {/* Featured Producers */}
      {producers.length > 0 && (
        <section className="container mx-auto px-4">
          <SectionTitle>注目の生産者</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {producers.map((producer) => (
              <ProducerCard key={producer.id} producer={producer} />
            ))}
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="container mx-auto px-4">
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg">
            <SectionTitle>食の縁とは？</SectionTitle>
            <div className="space-y-6 text-stone-700 leading-relaxed">
                <p>私たちは、単なる予約や購入の場ではなく、人と人が出会い、信頼し、つながり続ける場として機能することを目指しています。</p>
                <p className="pt-4 text-center text-lg font-medium text-amber-700">さあ、あなたも「関係」からはじまる新しい食の旅に出かけませんか？</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;