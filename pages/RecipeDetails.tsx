import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Share2, Play, Clock, Users, Leaf, Check, Send } from 'lucide-react';
import { Recipe } from '../types';

const RecipeDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data (In a real app, fetch by ID)
  const recipe: Recipe = {
    id: '1',
    title: 'Classic Pad Thai',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1000&auto=format&fit=crop',
    author: 'Laura Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    time: '30 Mins',
    servings: 4,
    isVegan: true,
    description: 'A delicious and easy-to-make Pad Thai recipe that brings authentic Thai flavors to your kitchen. Perfect for a weeknight dinner.',
    ingredients: [
      '8 oz rice noodles',
      '1 lb shrimp, peeled and deveined',
      '3 tbsp fish sauce',
      '1 block of firm tofu, pressed and cubed',
      '2 large eggs, lightly beaten'
    ],
    instructions: [
      'Soak noodles in warm water for 30 minutes.',
      'Heat oil in a wok over medium-high heat.',
      'Add shrimp and tofu, cook until golden.',
      'Push to side, scramble eggs.',
      'Add noodles and sauce, toss until coated.',
      'Garnish with peanuts and lime.'
    ],
    category: 'Asian Cuisine',
    comments: [
      {
        id: 'c1',
        user: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
        timeAgo: '2 days ago',
        text: 'Added a bit of sriracha for an extra kick. It was amazing! Highly recommend.'
      },
      {
        id: 'c2',
        user: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
        timeAgo: '1 week ago',
        text: 'This has become a weekly staple in our house. So easy and flavorful.'
      }
    ]
  };

  const [activeTab, setActiveTab] = React.useState<'ingredients' | 'instructions'>('ingredients');

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-20">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-content-light dark:text-content-dark">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-content-light dark:text-content-dark">Recipe Details</h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-content-light dark:text-content-dark">
            <Bookmark size={24} />
          </button>
          <button className="p-2 -mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-content-light dark:text-content-dark">
            <Share2 size={24} />
          </button>
        </div>
      </div>

      {/* Video/Image */}
      <div className="px-4">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
              <Play size={32} fill="white" className="text-white ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6">
        <h1 className="text-3xl font-bold text-content-light dark:text-content-dark leading-tight mb-4">
          {recipe.title}
        </h1>

        {/* Author */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={recipe.authorAvatar} alt={recipe.author} className="w-10 h-10 rounded-full object-cover border border-border-light" />
            <span className="font-medium text-content-light dark:text-content-dark">Recipe by {recipe.author}</span>
          </div>
          <button className="px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-bold hover:bg-primary/30 transition-colors">
            Follow
          </button>
        </div>

        <p className="text-subtle-light dark:text-subtle-dark leading-relaxed mb-6">
          {recipe.description}
        </p>

        {/* Stats Pills */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2c2617] rounded-xl border border-border-light dark:border-border-dark whitespace-nowrap">
            <Clock size={18} className="text-subtle-light dark:text-subtle-dark" />
            <span className="font-semibold text-content-light dark:text-content-dark">{recipe.time}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2c2617] rounded-xl border border-border-light dark:border-border-dark whitespace-nowrap">
            <Users size={18} className="text-subtle-light dark:text-subtle-dark" />
            <span className="font-semibold text-content-light dark:text-content-dark">Serves {recipe.servings}</span>
          </div>
          {recipe.isVegan && (
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2c2617] rounded-xl border border-border-light dark:border-border-dark whitespace-nowrap">
              <Leaf size={18} className="text-green-500" />
              <span className="font-semibold text-content-light dark:text-content-dark">Vegan Option</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 p-1 bg-border-light/30 dark:bg-border-dark/30 rounded-xl mb-6">
          <button 
            onClick={() => setActiveTab('ingredients')}
            className={`py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'ingredients' ? 'bg-primary text-white shadow-sm' : 'text-subtle-light dark:text-subtle-dark'}`}
          >
            Ingredients
          </button>
          <button 
            onClick={() => setActiveTab('instructions')}
            className={`py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'instructions' ? 'bg-primary text-white shadow-sm' : 'text-subtle-light dark:text-subtle-dark'}`}
          >
            Instructions
          </button>
        </div>

        {/* List */}
        <div className="space-y-4 mb-8">
          {activeTab === 'ingredients' ? (
             recipe.ingredients.map((item, idx) => (
               <label key={idx} className="flex items-start gap-4 cursor-pointer group">
                 <div className="relative flex items-center">
                    <input type="checkbox" className="peer h-6 w-6 rounded-md border-2 border-border-light dark:border-border-dark bg-transparent checked:bg-primary checked:border-primary focus:ring-0 transition-all" />
                    <Check size={16} className="absolute left-1 top-1 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                 </div>
                 <span className="text-lg text-content-light dark:text-content-dark group-hover:text-primary transition-colors">{item}</span>
               </label>
             ))
          ) : (
            recipe.instructions.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-border-light dark:bg-border-dark flex items-center justify-center font-bold text-content-light dark:text-content-dark">
                  {idx + 1}
                </div>
                <p className="text-lg text-content-light dark:text-content-dark leading-relaxed pb-4 border-b border-border-light/30 dark:border-border-dark/30">{step}</p>
              </div>
            ))
          )}
        </div>

        {/* Community Tips */}
        <div className="border-t border-border-light dark:border-border-dark pt-6 -mx-4 px-4 bg-white dark:bg-[#1a160e]">
          <h3 className="text-xl font-bold text-content-light dark:text-content-dark mb-4">Community Tips</h3>
          <div className="space-y-6">
            {recipe.comments?.map(comment => (
              <div key={comment.id} className="flex gap-3">
                <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-content-light dark:text-content-dark">{comment.user}</span>
                    <span className="text-xs text-subtle-light dark:text-subtle-dark">{comment.timeAgo}</span>
                  </div>
                  <p className="text-sm text-content-light/90 dark:text-content-dark/90 leading-relaxed">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Input */}
          <div className="mt-6 flex gap-3 items-center pb-6">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full" />
             <div className="relative flex-1">
               <input type="text" placeholder="Add a tip..." className="w-full bg-background-light dark:bg-[#2c2617] border border-border-light dark:border-border-dark rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-primary" />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:bg-primary/10 rounded-full">
                 <Send size={20} />
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
