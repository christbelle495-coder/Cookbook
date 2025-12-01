import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Grid, PlayCircle } from 'lucide-react';

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
    <div className="flex flex-col min-h-full bg-background-light dark:bg-background-dark">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-6">
        <button onClick={() => navigate(-1)} className="text-content-light dark:text-content-dark hover:bg-gray-100 dark:hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-content-light dark:text-content-dark">My Profile</h2>
        <button className="text-content-light dark:text-content-dark hover:bg-gray-100 dark:hover:bg-white/10 p-2 -mr-2 rounded-full transition-colors">
          <Settings size={24} />
        </button>
      </div>

      <div className="px-6 flex flex-col items-center pt-2">
         {/* Avatar */}
         <div className="w-28 h-28 rounded-full p-1 border-2 border-primary mb-4 shadow-glow relative">
           <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover border-4 border-background-light dark:border-background-dark" />
         </div>
         
         {/* Info */}
         <h1 className="text-2xl font-bold text-content-light dark:text-content-dark mb-1">{user.name}</h1>
         <p className="text-primary font-bold mb-4">{user.handle}</p>
         <p className="text-center text-subtle-light dark:text-subtle-dark leading-relaxed max-w-xs mb-8 text-sm">
           {user.bio}
         </p>

         {/* Stats */}
         <div className="flex w-full justify-between gap-4 mb-8">
            <div className="flex-1 flex flex-col items-center">
               <span className="text-xl font-bold text-content-light dark:text-content-dark">{user.stats.recipes}</span>
               <span className="text-xs text-subtle-light dark:text-subtle-dark font-medium">Recipes</span>
            </div>
            <div className="w-[1px] bg-border-light dark:bg-border-dark h-8 self-center"></div>
            <div className="flex-1 flex flex-col items-center">
               <span className="text-xl font-bold text-content-light dark:text-content-dark">{user.stats.followers}</span>
               <span className="text-xs text-subtle-light dark:text-subtle-dark font-medium">Followers</span>
            </div>
            <div className="w-[1px] bg-border-light dark:bg-border-dark h-8 self-center"></div>
            <div className="flex-1 flex flex-col items-center">
               <span className="text-xl font-bold text-content-light dark:text-content-dark">{user.stats.following}</span>
               <span className="text-xs text-subtle-light dark:text-subtle-dark font-medium">Following</span>
            </div>
         </div>
         
         <div className="w-full flex gap-3 mb-8">
            <button className="flex-1 py-3 rounded-2xl bg-primary text-white font-bold shadow-glow hover:scale-[1.02] transition-all">
                Edit Profile
            </button>
             <button className="py-3 px-4 rounded-2xl bg-gray-100 dark:bg-white/5 text-content-light dark:text-content-dark font-bold hover:bg-gray-200 transition-all">
                Share
            </button>
         </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-background-light dark:bg-background-dark">
        <div className="flex px-6 border-b border-border-light dark:border-border-dark">
          <button className="flex-1 py-4 flex justify-center items-center gap-2 border-b-[2px] border-primary text-primary transition-colors">
            <Grid size={20} />
            <span className="font-bold text-sm">Recipes</span>
          </button>
          <button className="flex-1 py-4 flex justify-center items-center gap-2 border-b-[2px] border-transparent text-subtle-light dark:text-subtle-dark hover:text-content-light transition-colors">
            <PlayCircle size={20} />
            <span className="font-medium text-sm">Videos</span>
          </button>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 gap-3 p-3 pb-24">
        {user.posts.map((post, idx) => (
          <div key={post.id} className="relative aspect-[4/5] cursor-pointer group overflow-hidden rounded-2xl">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-xs font-bold line-clamp-2">{post.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;