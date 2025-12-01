import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const user = {
    name: "Alex Doe",
    handle: "@alexdoe",
    bio: "Lover of Italian food and home baking. Sharing my kitchen experiments with the world!",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
    stats: {
      recipes: 42,
      followers: "1.2K",
      following: 340
    },
    posts: [
      { id: 'p1', title: 'Classic Lasagna', img: 'https://images.unsplash.com/photo-1574868352513-587f3e8f7ac4?q=80&w=400&auto=format&fit=crop' },
      { id: 'p2', title: 'Spicy Thai Green Curry', img: 'https://images.unsplash.com/photo-1626804475297-411dbe631e8b?q=80&w=400&auto=format&fit=crop' },
      { id: 'p3', title: 'Homemade Sourdough', img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=400&auto=format&fit=crop' },
      { id: 'p4', title: 'Chocolate Lava Cake', img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=400&auto=format&fit=crop' },
      { id: 'p5', title: 'Summer Berry Salad', img: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=400&auto=format&fit=crop' },
      { id: 'p6', title: 'Authentic Ramen', img: 'https://images.unsplash.com/photo-1614563637806-1d0e645e0940?q=80&w=400&auto=format&fit=crop' },
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 bg-background-light dark:bg-background-dark z-10">
        <button onClick={() => navigate(-1)} className="text-content-light dark:text-content-dark">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-content-light dark:text-content-dark">Profile</h2>
        <button className="text-content-light dark:text-content-dark">
          <Settings size={24} />
        </button>
      </div>

      <div className="px-6 flex flex-col items-center pt-2">
         {/* Avatar */}
         <div className="w-32 h-32 rounded-full p-1 border-2 border-primary mb-4">
           <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
         </div>
         
         {/* Info */}
         <h1 className="text-2xl font-bold text-content-light dark:text-content-dark mb-1">{user.name}</h1>
         <p className="text-primary font-medium mb-3">{user.handle}</p>
         <p className="text-center text-subtle-light dark:text-subtle-dark leading-relaxed max-w-xs mb-6">
           {user.bio}
         </p>

         <button className="w-full max-w-xs py-2.5 rounded-xl bg-white dark:bg-[#2c2617] border border-border-light dark:border-border-dark font-bold text-content-light dark:text-content-dark hover:bg-gray-50 dark:hover:bg-[#362e1c] transition-colors mb-8">
           Edit Profile
         </button>

         {/* Stats */}
         <div className="flex w-full justify-between gap-4 mb-8">
            <div className="flex-1 bg-white dark:bg-[#2c2617] rounded-xl border border-border-light dark:border-border-dark p-3 flex flex-col items-center">
               <span className="text-xl font-bold text-content-light dark:text-content-dark">{user.stats.recipes}</span>
               <span className="text-xs text-subtle-light dark:text-subtle-dark uppercase tracking-wider font-semibold">Recipes</span>
            </div>
            <div className="flex-1 bg-white dark:bg-[#2c2617] rounded-xl border border-border-light dark:border-border-dark p-3 flex flex-col items-center">
               <span className="text-xl font-bold text-content-light dark:text-content-dark">{user.stats.followers}</span>
               <span className="text-xs text-subtle-light dark:text-subtle-dark uppercase tracking-wider font-semibold">Followers</span>
            </div>
            <div className="flex-1 bg-white dark:bg-[#2c2617] rounded-xl border border-border-light dark:border-border-dark p-3 flex flex-col items-center">
               <span className="text-xl font-bold text-content-light dark:text-content-dark">{user.stats.following}</span>
               <span className="text-xs text-subtle-light dark:text-subtle-dark uppercase tracking-wider font-semibold">Following</span>
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[56px] z-10 bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark">
        <div className="flex">
          <button className="flex-1 py-4 text-center border-b-2 border-primary font-bold text-content-light dark:text-content-dark">
            Recipes
          </button>
          <button className="flex-1 py-4 text-center border-b-2 border-transparent font-medium text-subtle-light dark:text-subtle-dark">
            Videos
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {user.posts.map(post => (
          <div key={post.id} className="relative aspect-square cursor-pointer group overflow-hidden">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <p className="text-white text-xs font-bold line-clamp-2">{post.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
