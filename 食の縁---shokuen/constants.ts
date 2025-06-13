
import { Producer, AppRoute, Post, User, Notification } from './types';

export const APP_ROUTES = {
  HOME: AppRoute.Home,
  LOGIN: AppRoute.Login,
  SIGNUP: AppRoute.Signup,
  PRODUCERS_LIST: AppRoute.ProducersList,
  PRODUCER_DETAIL_PARAM: AppRoute.ProducerDetail, // For route definition
  PRODUCER_DETAIL: (id: string) => `/producers/${id}`, // For generating links
  POSTS_FEED: AppRoute.PostsFeed,
  POST_DETAIL_PARAM: AppRoute.PostDetail,
  POST_DETAIL: (postId: string) => `/posts/${postId}`,
  RESERVATION_PARAM: AppRoute.Reservation,
  RESERVATION: (postId: string) => `/reservation/${postId}`,
  NOTIFICATIONS: AppRoute.Notifications,
};

export const MOCK_USER: User = {
  id: 'user1',
  name: '食いしん坊ユーザー',
  email: 'user@example.com',
  avatar: 'https://picsum.photos/seed/useravatar/100/100',
  followedProducers: ['1', '3'], // User follows producer 1 and 3
};

export const MOCK_PRODUCERS: Producer[] = [
  {
    id: '1',
    name: '緑豊ファーム (Midori Yutaka Farm)',
    tagline: '太陽と大地の恵みを食卓へ',
    location: '長野県安曇野市',
    storySummary: 'アルプスの麓、清らかな水と澄んだ空気の中で、家族経営で愛情込めて野菜を育てています。化学肥料や農薬に頼らず、自然本来の力を活かした農法がこだわりです。',
    specialty: ['有機野菜', '高原トマト', '手作りジャム'],
    profileImage: 'https://picsum.photos/seed/farmprofile1/300/300',
    coverImage: 'https://picsum.photos/seed/farmcover1/1200/400',
    philosophy: '「食べることは生きること」。安全で美味しい野菜を通じて、皆様の健康と笑顔に貢献したいと願っています。畑に来て、土に触れ、自然の豊かさを感じてください。',
    visitInfo: '週末には畑の見学ツアー（要予約）や収穫体験を実施しています。詳細はウェブサイトをご確認ください。',
    products: [
      { id: 'p1', name: '完熟高原トマト', description: '甘みと酸味のバランスが絶妙な自慢のトマトです。', image: 'https://picsum.photos/seed/tomato/300/200', price: '¥500/kg' },
      { id: 'p2', name: '旬の有機野菜セット', description: '季節ごとの新鮮な有機野菜を詰め合わせ。', image: 'https://picsum.photos/seed/vegset/300/200', price: '¥2,500/セット' },
    ],
    followerCount: 156,
  },
  {
    id: '2',
    name: '海風牧場 (Umikaze Bokujo)',
    tagline: '潮風育ちの元気な乳製品',
    location: '北海道厚岸町',
    storySummary: '太平洋を望む広大な牧草地で、牛たちはストレスフリーに育ちます。新鮮な生乳から作るチーズやヨーグルトは、濃厚ながらも後味すっきり。',
    specialty: ['ナチュラルチーズ', '放牧牛乳', 'ヨーグルト'],
    profileImage: 'https://picsum.photos/seed/cowprofile2/300/300',
    coverImage: 'https://picsum.photos/seed/cowcover2/1200/400',
    philosophy: '「動物福祉第一」。牛たちが健康で幸せであることが、美味しい乳製品の源泉だと信じています。海と大地の恵みを、そのままの美味しさでお届けします。',
    visitInfo: '牧場内のカフェでは、製品の試食や購入が可能です。乳搾り体験も人気です（季節限定・要予約）。',
     products: [
      { id: 'p3', name: 'カマンベールチーズ', description: 'クリーミーで風味豊かな手作りカマンベール。', image: 'https://picsum.photos/seed/cheese/300/200', price: '¥1,200/個' },
      { id: 'p4', name: '放牧牛乳 (900ml)', description: 'パスチャライズド製法の新鮮な牛乳。', image: 'https://picsum.photos/seed/milk/300/200', price: '¥600/本' },
    ],
    followerCount: 230,
  },
  {
    id: '3',
    name: '里山養蜂園 (Satoyama Bee Garden)',
    tagline: '百花繚乱、森の蜜を集めて',
    location: '岐阜県美濃市',
    storySummary: '豊かな自然が残る里山で、ミツバチたちと共に暮らしています。四季折々の花から集められた蜂蜜は、それぞれ風味が異なり、自然の奥深さを感じさせます。',
    specialty: ['天然蜂蜜', 'みつろうキャンドル', 'プロポリス'],
    profileImage: 'https://picsum.photos/seed/beeprofile3/300/300',
    coverImage: 'https://picsum.photos/seed/beecover3/1200/400',
    philosophy: '「自然との共生」。ミツバチが健やかに活動できる環境を守ることが私たちの使命です。純粋で高品質な蜂蜜を通じて、里山の恵みをお届けします。',
    visitInfo: '養蜂体験や蜂蜜のテイスティングワークショップを不定期で開催。ミツバチの生態についても学べます。',
     products: [
      { id: 'p5', name: '百花蜜 (国産)', description: '様々な花の蜜が混ざり合った、豊かな風味の蜂蜜。', image: 'https://picsum.photos/seed/honey/300/200', price: '¥1,800/150g' },
    ],
    followerCount: 98,
  },
   {
    id: '4',
    name: '浜辺の漁師宿 網元 (Hamabe Ryoshiyado Amimoto)',
    tagline: '獲れたての海の幸を、真心込めて',
    location: '三重県鳥羽市',
    storySummary: '伊勢湾の豊かな漁場で、代々漁師を営んでいます。その日に水揚げされた新鮮な魚介を、併設の宿で提供。漁師ならではの豪快な料理が自慢です。',
    specialty: ['新鮮魚介', '漁師料理', '海鮮BBQ'],
    profileImage: 'https://picsum.photos/seed/fishprofile4/300/300',
    coverImage: 'https://picsum.photos/seed/fishcover4/1200/400',
    philosophy: '「海の恵みに感謝」。持続可能な漁業を心がけ、伊勢湾の豊かさを未来に繋ぎたい。お客様には、本当の魚の美味しさを知ってほしい。',
    visitInfo: '漁船体験（要予約）や、獲れたての魚を使った料理教室も開催しています。宿泊も可能です。',
    products: [
        { id: 'p6', name: '季節のお刺身盛り合わせ', description: 'その日の水揚げから厳選した鮮魚のお刺身。', image: 'https://picsum.photos/seed/sashimi/300/200', price: '時価' },
        { id: 'p7', name: '海鮮浜焼きセット', description: 'サザエ、大アサリ、イカなどを炭火で楽しむセット。', image: 'https://picsum.photos/seed/bbqseafood/300/200', price: '¥3,500/人' },
      ],
    followerCount: 180,
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post1',
    producerId: '1',
    producerName: '緑豊ファーム',
    producerProfileImage: MOCK_PRODUCERS[0].profileImage,
    title: '真っ赤なトマト、収穫最盛期です！🍅',
    content: '今年の夏も太陽をたっぷり浴びて、うちの有機トマトが真っ赤に実りました！甘くてジューシー、サラダにもパスタにも最高ですよ。週末はトマト狩り体験も開催中！ぜひ遊びに来てくださいね。',
    imageUrl: 'https://picsum.photos/seed/posttomato/600/400',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likes: 25,
  },
  {
    id: 'post2',
    producerId: '2',
    producerName: '海風牧場',
    producerProfileImage: MOCK_PRODUCERS[1].profileImage,
    title: '新作チーズ「潮騒のカマンベール」できました🧀',
    content: '海風牧場自慢のジャージー牛乳を使い、じっくり熟成させたカマンベールチーズが完成しました。濃厚でクリーミー、クラッカーやワインのお供にどうぞ。数量限定ですのでお早めに！',
    imageUrl: 'https://picsum.photos/seed/postcheese/600/400',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    likes: 42,
  },
  {
    id: 'post3',
    producerId: '1',
    producerName: '緑豊ファーム',
    producerProfileImage: MOCK_PRODUCERS[0].profileImage,
    title: '畑の様子と週末イベントのお知らせ',
    content: '今週はきゅうりやナスも元気に育っています！週末の収穫体験では、これらの夏野菜も収穫できますよ。家族みんなで楽しめるイベントです。ご予約お待ちしています！',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    likes: 18,
  },
  {
    id: 'post4',
    producerId: '3',
    producerName: '里山養蜂園',
    producerProfileImage: MOCK_PRODUCERS[2].profileImage,
    title: '春一番の蜂蜜、採蜜しました🌸🐝',
    content: '桜や菜の花の蜜がたっぷり入った「春告蜜（はるつげみつ）」が採れました！優しい甘さと華やかな香りが特徴です。パンに塗ったり、ヨーグルトに入れたり。春の味覚をお楽しみください。',
    imageUrl: 'https://picsum.photos/seed/posthoney/600/400',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    likes: 33,
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif1',
    type: 'new_post',
    title: '緑豊ファームが新しい投稿をしました',
    message: '「真っ赤なトマト、収穫最盛期です！🍅」...続きを読む',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
    relatedPostId: 'post1',
    relatedProducerId: '1',
    linkTo: APP_ROUTES.POST_DETAIL('post1'),
  },
  {
    id: 'notif2',
    type: 'reservation_update',
    title: '予約状況が更新されました',
    message: '海風牧場でのチーズ作り体験の予約が確定しました。',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
    // linkTo: '/reservations/details/res123' // Example link
  },
  {
    id: 'notif3',
    type: 'new_post',
    title: '里山養蜂園が新しい投稿をしました',
    message: '「春一番の蜂蜜、採蜜しました🌸🐝」...続きを読む',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    read: false,
    relatedPostId: 'post4',
    relatedProducerId: '3',
    linkTo: APP_ROUTES.POST_DETAIL('post4'),
  },
];
