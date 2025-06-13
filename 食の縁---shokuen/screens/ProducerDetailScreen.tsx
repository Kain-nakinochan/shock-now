
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Producer, Product as ProductType, Post } from '../types';
import { APP_ROUTES, MOCK_PRODUCERS } from '../constants'; // MOCK_PRODUCERS for direct update reference
import { generateProducerStory } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';
import SectionTitle from '../components/SectionTitle';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';

interface ProducerDetailScreenProps {
  producers: Producer[]; // Passed from AppNavigator, can be used if MOCK_PRODUCERS isn't always the source of truth
  posts: Post[];
}

const ProductCardComponent: React.FC<{ product: ProductType }> = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
        <div className="p-5">
            <h4 className="text-lg font-semibold text-stone-800 mb-1">{product.name}</h4>
            <p className="text-sm text-stone-600 mb-3 h-16 overflow-hidden">{product.description}</p>
            {product.price && <p className="text-md font-bold text-green-600">{product.price}</p>}
        </div>
    </div>
);

const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.393c-.842.07-1.168 1.063-.57 1.631l3.658 3.095-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.041 2.477c.714.436 1.598-.207 1.404-1.02l-1.106-4.637 3.658-3.095c.598-.568.272-1.561-.57-1.631l-4.753-.393L10.868 2.884z" clipRule="evenodd" />
    </svg>
);

const UsersIconSolid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path fillRule="evenodd" d="M1.5 16.5A1.5 1.5 0 0 0 3 15h14a1.5 1.5 0 0 0 1.5 1.5v2A1.5 1.5 0 0 0 17 20H3a1.5 1.5 0 0 0-1.5-1.5v-2Z" clipRule="evenodd" />
  </svg>
);


const ProducerDetailScreen: React.FC<ProducerDetailScreenProps> = ({ producers: initialProducers, posts }) => {
  const { id } = useParams<{ id: string }>();
  const { currentUser, isAuthenticated, toggleFollowProducer } = useAuth();
  const navigate = useNavigate();

  // Find producer from MOCK_PRODUCERS as it's being updated by AuthContext
  const producer = MOCK_PRODUCERS.find(p => p.id === id); 
  
  const [producerPosts, setProducerPosts] = useState<Post[]>([]);
  const [aiStory, setAiStory] = useState<string>('');
  const [isLoadingStory, setIsLoadingStory] = useState<boolean>(false);
  const [errorStory, setErrorStory] = useState<string>('');

  const isFollowing = currentUser?.followedProducers.includes(id || '') || false;

  useEffect(() => {
    if (producer) {
      const associatedPosts = posts.filter(post => post.producerId === id);
      setProducerPosts(associatedPosts);
    } else {
      console.error("Producer not found with ID:", id);
      // Optionally navigate to a 404 page or back
      // navigate(APP_ROUTES.PRODUCERS_LIST); 
    }
  }, [id, producer, posts, navigate]);

  const handleGenerateStory = useCallback(async () => {
    if (!producer) return;
    setIsLoadingStory(true);
    setErrorStory('');
    setAiStory('');
    try {
      const story = await generateProducerStory({
        name: producer.name,
        specialty: producer.specialty,
        philosophy: producer.philosophy,
      });
      setAiStory(story);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'AIストーリーの生成中に不明なエラーが発生しました。';
      setErrorStory(message);
    } finally {
      setIsLoadingStory(false);
    }
  }, [producer]);

  const handleFollowToggle = () => {
    if (!isAuthenticated) {
        navigate(APP_ROUTES.LOGIN, { state: { from: location.pathname } }); // Redirect to login
        return;
    }
    if (producer) {
      toggleFollowProducer(producer.id);
    }
  };

  if (!producer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center py-10">
        <LoadingSpinner />
        <p className="text-stone-600 mt-4 text-lg">生産者情報を読み込んでいます...</p>
        <p className="mt-2 text-sm text-stone-500">
          生産者が見つからない場合は、<Link to={APP_ROUTES.PRODUCERS_LIST} className="text-green-600 hover:underline">生産者一覧</Link>に戻ってください。
        </p>
      </div>
    );
  }
  
  // Display the current follower count from the producer object
  const displayFollowerCount = producer.followerCount;

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="relative h-72 md:h-96 w-full">
        <img src={producer.coverImage} alt={`${producer.name} cover`} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-end p-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-xl mb-2">{producer.name}</h1>
            <p className="text-xl md:text-2xl font-medium text-amber-300 text-center drop-shadow-lg">{producer.tagline}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl -mt-20 md:-mt-28 relative z-10 mb-12">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-8 mb-8">
                <img src={producer.profileImage} alt={`${producer.name} profile`} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg mx-auto md:mx-0 mb-4 md:mb-0 flex-shrink-0"/>
                <div className="text-center md:text-left flex-grow pt-4 md:pt-2">
                    <p className="text-stone-700 text-lg mb-2">{producer.location}</p>
                    <div className="flex items-center justify-center md:justify-start space-x-1 text-stone-600 mb-4">
                      <UsersIconSolid className="w-5 h-5 text-green-600"/> 
                      <span className="font-medium">{displayFollowerCount.toLocaleString()}</span>
                      <span className="text-sm">フォロワー</span>
                    </div>
                    <div className="space-x-2 mb-4">
                        {producer.specialty.map((spec, index) => (
                        <span key={index} className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full">{spec}</span>
                        ))}
                    </div>
                     {isAuthenticated && (
                        <button
                            onClick={handleFollowToggle}
                            className={`px-6 py-2.5 rounded-md font-semibold transition-all duration-200 ease-in-out text-base shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                            isFollowing 
                                ? 'bg-stone-200 text-stone-700 hover:bg-stone-300 focus:ring-stone-400' 
                                : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                            }`}
                        >
                            {isFollowing ? 'フォロー中' : 'フォローする'}
                        </button>
                    )}
                    {!isAuthenticated && (
                         <Link 
                            to={APP_ROUTES.LOGIN}
                            state={{ from: location.pathname }}
                            className="inline-block px-6 py-2.5 rounded-md font-semibold bg-green-600 text-white hover:bg-green-700 transition-all duration-200 ease-in-out text-base shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                            フォローする
                        </Link>
                    )}
                </div>
            </div>

            <section className="mb-10"><SectionTitle>私たちの想い・こだわり</SectionTitle><p className="text-stone-700 leading-relaxed whitespace-pre-line text-lg">{producer.philosophy}</p></section>
            <section className="mb-10"><SectionTitle>私たちの物語</SectionTitle><p className="text-stone-700 leading-relaxed whitespace-pre-line">{producer.storySummary}</p></section>

            {producer.products && producer.products.length > 0 && (
                <section className="mb-12">
                    <SectionTitle>お届けできるもの</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {producer.products.map(product => <ProductCardComponent key={product.id} product={product} />)}
                    </div>
                </section>
            )}
             {producerPosts.length > 0 && (
              <section className="mb-12">
                <SectionTitle>最近の投稿</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {producerPosts.slice(0, 4).map(post => <PostCard key={post.id} post={post} />)}
                </div>
                {/* TODO: Link to a page showing all posts by this producer */}
              </section>
            )}

            {producer.visitInfo && (
                <section className="mb-12 p-6 bg-green-50 rounded-xl border border-green-200">
                    <SectionTitle>訪問・体験について</SectionTitle>
                    <p className="text-stone-700 leading-relaxed whitespace-pre-line">{producer.visitInfo}</p>
                </section>
            )}
        </div>

        <section className="mb-12 p-6 md:p-8 bg-amber-50 rounded-xl border-2 border-amber-200 shadow-lg">
            <div className="flex items-center mb-4"><SparkleIcon className="w-8 h-8 text-amber-500 mr-3"/><SectionTitle className="text-amber-700 border-amber-200 !mb-0 !pb-0 !border-b-0">AIが紡ぐ生産者の物語</SectionTitle></div>
            <p className="text-stone-600 mb-6">AI技術を使って、{producer.name}の魅力や想いを短い物語にしてみました。</p>
            <button onClick={handleGenerateStory} disabled={isLoadingStory} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-8 rounded-lg transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow hover:shadow-md">
                {isLoadingStory && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>)}
                {isLoadingStory ? '物語を生成中...' : 'AIに物語を語ってもらう'}
            </button>
            {isLoadingStory && <div className="mt-4"><LoadingSpinner /></div>}
            {errorStory && <p role="alert" className="mt-4 text-red-700 bg-red-100 p-4 rounded-md border border-red-300">{errorStory}</p>}
            {aiStory && <div className="mt-6 p-6 bg-white border border-stone-200 rounded-lg shadow-inner"><p className="text-stone-700 leading-relaxed whitespace-pre-line text-lg">{aiStory}</p></div>}
        </section>
            
        <div className="mt-12 text-center">
            <Link to={APP_ROUTES.PRODUCERS_LIST} className="text-green-600 hover:text-green-800 transition-colors font-medium hover:underline text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                他の生産者も見る
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProducerDetailScreen;