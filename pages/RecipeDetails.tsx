import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Share2, Play, Clock, Users, Leaf, Check, Send } from 'lucide-react';
import { Recipe } from '../types';

const RecipeDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data
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
      'Soak noodles in warm water for 30 minutes to prepare them for stir-frying.',
      'Heat oil in a wok over medium-high heat. Add aromatics like garlic and shallots.',
      'Add shrimp and tofu, cook until golden brown on all sides.',
      'Push ingredients to the side, scramble eggs in the open space.',
      'Add noodles and sauce, toss vigorously until everything is coated and noodles are tender.',
      'Garnish with peanuts, lime wedges, and fresh cilantro before serving.'
    ],
    category: 'Asian Cuisine',
    comments: [
      {
        id: 'c1',
        user: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
        timeAgo: '2d ago',
        text: 'Added a bit of sriracha for an extra kick. It was amazing!'
      },
      {
        id: 'c2',
        user: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
        timeAgo: '1w ago',
        text: 'Weekly staple now. So easy and flavorful.'
      }
    ]
  };

  const [activeTab, setActiveTab] = React.useState<'ingredients' | 'instructions'>('ingredients');

  return (
    <div className="flex flex-col min-h-full bg-background-light dark:bg-background-dark">
      
      {/* Immersive Hero Image */}
      <div className="relative h-[45vh] w-full">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20"></div>
        
        {/* Navbar Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
          <button 
            onClick={() => navigate(-1)} 
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/40 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-3">
             <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/40 transition-colors">
              <Bookmark size={22} />
            </button>
            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/40 transition-colors">
              <Share2 size={22} />
            </button>
          </div>
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-glow hover:scale-105 transition-transform">
               <Play size={32} fill="white" className="text-white ml-2" />
            </button>
        </div>
      </div>

      {/* Content Sheet */}
      <div className="relative -mt-10 bg-background-light dark:bg-background-dark rounded-t-[2.5rem] px-6 pt-10 pb-8 flex-1 animate-slide-up shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        
        {/* Drag handle visual */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

        {/* Header Info */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-4">
            <h1 className="text-3xl font-extrabold text-content-light dark:text-content-dark leading-tight mb-2">
              {recipe.title}
            </h1>
            <div className="flex items-center gap-2 text-subtle-light dark:text-subtle-dark">
               <span className="font-bold text-primary">{recipe.category}</span>
               <span>•</span>
               <div className="flex items-center gap-1">
                 <Users size={16} />
                 <span>{recipe.servings} People</span>
               </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                <Leaf size={14} className="text-green-600 dark:text-green-400" />
                <span className="text-xs font-bold text-green-700 dark:text-green-400">Vegan</span>
             </div>
             <div className="flex items-center gap-1 text-content-light dark:text-content-dark font-bold">
               <Clock size={16} className="text-primary" />
               <span>{recipe.time}</span>
             </div>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark rounded-2xl mb-8 shadow-soft">
          <div className="flex items-center gap-3">
            <img src={recipe.authorAvatar} alt={recipe.author} className="w-12 h-12 rounded-full object-cover ring-2 ring-background-light dark:ring-background-dark" />
            <div>
                <p className="text-xs text-subtle-light dark:text-subtle-dark font-bold uppercase tracking-wider">Created by</p>
                <p className="font-bold text-content-light dark:text-content-dark text-lg">{recipe.author}</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-glow hover:bg-primary/90 transition-all">
            Follow
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-1.5 bg-gray-100 dark:bg-surface-dark rounded-2xl mb-8">
          <button 
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'ingredients' ? 'bg-white dark:bg-[#333] text-primary shadow-sm' : 'text-subtle-light dark:text-subtle-dark hover:text-content-light'}`}
          >
            Ingredients
          </button>
          <button 
            onClick={() => setActiveTab('instructions')}
            className={`flex-1 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'instructions' ? 'bg-white dark:bg-[#333] text-primary shadow-sm' : 'text-subtle-light dark:text-subtle-dark hover:text-content-light'}`}
          >
            Instructions
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="space-y-4 mb-10 min-h-[300px]">
          {activeTab === 'ingredients' ? (
             <div className="grid gap-3">
               {recipe.ingredients.map((item, idx) => (
                 <label key={idx} className="flex items-center gap-4 cursor-pointer group p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-transparent hover:border-primary/30 transition-all shadow-soft">
                   <div className="relative flex items-center justify-center w-6 h-6">
                      <input type="checkbox" className="peer appearance-none w-6 h-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 checked:bg-primary checked:border-primary transition-all cursor-pointer" />
                      <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                   </div>
                   <span className="text-lg text-content-light dark:text-content-dark font-medium peer-checked:line-through peer-checked:text-subtle-light transition-all">{item}</span>
                 </label>
               ))}
             </div>
          ) : (
             <div className="relative border-l-2 border-dashed border-gray-200 dark:border-gray-700 ml-4 space-y-8 py-2">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-glow ring-4 ring-background-light dark:ring-background-dark">
                    {idx + 1}
                  </div>
                  <p className="text-lg text-content-light dark:text-content-dark leading-relaxed font-medium">{step}</p>
                </div>
              ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;