import React from 'react';
import FeedCard from './components/FeedCard';

const FeedPage = () => {
  const posts = [
    { 
      id: 1, 
      user: 'MalwareHunter', 
      location: 'Kiev, Ukraine',
      hash: '7f3ab9c1d2e4', 
      family: 'Emotet', 
      threat: 'CRITICAL', 
      status: 'Completed', 
      date: '2 HOURS AGO', 
      score: 94,
      comments: 12,
      caption: 'Just found this Emotet variant in a phishing campaign. Stay safe everyone!'
    },
    { 
      id: 2, 
      user: 'CyberGuardian', 
      location: 'Berlin, Germany',
      hash: 'a1b2c3d4e5f6', 
      family: 'AsyncRAT', 
      threat: 'HIGH', 
      status: 'Analyzing', 
      date: '4 HOURS AGO', 
      score: 81,
      comments: 5,
      caption: 'New AsyncRAT sample spotted. Seems to be targeting financial institutions.'
    },
    { 
      id: 3, 
      user: 'Infosec_Joe', 
      location: 'New York, USA',
      hash: 'f9e8d7c6b5a4', 
      family: 'Mirai Botnet', 
      threat: 'HIGH', 
      status: 'Peer Review', 
      date: '6 HOURS AGO', 
      score: 77,
      comments: 24,
      caption: 'Massive Mirai botnet activity detected. Re-analyzing the payload.'
    },
    { 
      id: 4, 
      user: 'RansomAware', 
      location: 'London, UK',
      hash: '3c4d5e6f7a8b', 
      family: 'LockBit 3.0', 
      threat: 'CRITICAL', 
      status: 'Completed', 
      date: '1 DAY AGO', 
      score: 98,
      comments: 42,
      caption: 'LockBit 3.0 is getting more sophisticated. Check out the encryption routine.'
    },
  ];

  return (
    <main className="flex-1 overflow-auto relative z-10">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Feed List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FeedPage;
