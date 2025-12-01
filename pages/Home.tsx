import React, { useState } from 'react';
import { Search, Star, Heart, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';

const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Fresh Summer Salad',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop',
    author: 'Chef Anna',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    time: '15 min',
    servings: 2,
    description: 'A refreshing salad for hot days.',
    ingredients: [],
    instructions: [],
    category: 'Local Delights'
  },
  {
    id: '2',
    title: 'Classic Pepperoni Pizza',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop',
    author: 'Mario',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    time: '45 min',
    servings: 4,
    description: 'Homemade pizza with crispy crust.',
    ingredients: [],
    instructions: [],
    category: 'Western'
  },
  {
    id: '3',
    title: 'Blueberry Pancakes',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000&auto=format&fit=crop',
    author: 'Breakfast Club',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    time: '25 min',
    servings: 3,
    description: 'Fluffy pancakes with fresh berries.',
    ingredients: [],
    instructions: [],
    category: 'Desserts'
  },
  {
    id: '4',
    title: 'BBQ Chicken Skewers',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1593560708920-63984be368ad?q=80&w=1000&auto=format&fit=crop',
    author: 'Grill Master',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
    time: '35 min',
    servings: 4,
    description: 'Sweet and savory BBQ chicken.',
    ingredients: [],
    instructions: [],
    category: 'Asian Cuisine'
  }
];

const CATEGORIES = ['All', 'Local Delights', 'Western', 'Asian Cuisine', 'Desserts', 'Healthy'];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredRecipes = activeCategory === 'All' 
    ? MOCK_RECIPES 
    : MOCK_RECIPES.filter(r => r.category === activeCategory);

  return (
    <div className="flex flex-col min-h-full bg-background-light dark:bg-background-dark animate-fade-in">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        <div>
          <p className="text-subtle-light dark:text-subtle-dark font-medium text-sm mb-1">Good Morning,</p>
          <h1 className="text-2xl font-bold text-content-light dark:text-content-dark">Alex Doe</h1>
        </div>
        <button className="h-12 w-12 rounded-full ring-2 ring-white dark:ring-[#2c2617] shadow-soft overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" 
             className="w-full h-full object-cover" 
             alt="Profile"
           />
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-subtle-light dark:text-subtle-dark group-focus-within:text-primary transition-colors" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="What are you cooking today?"
            className="block w-full pl-11 pr-4 py-4 rounded-2xl bg-surface-light dark:bg-surface-dark border-none text-content-light dark:text-content-dark placeholder-subtle-light focus:ring-2 focus:ring-primary/20 shadow-soft outline-none transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="pl-6 mb-8">
        <div className="flex gap-3 overflow-x-auto pb-4 pr-6 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-3 rounded-2xl whitespace-nowrap text-sm font-bold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-glow transform scale-105' 
                  : 'bg-surface-light dark:bg-surface-dark text-subtle-light dark:text-subtle-dark hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Recipe (if 'All') */}
      {activeCategory === 'All' && (
        <div className="px-6 mb-8 animate-slide-up">
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-bold text-content-light dark:text-content-dark">Trending Now</h2>
             <span className="text-primary text-sm font-bold cursor-pointer">See All</span>
           </div>
           <div 
             onClick={() => navigate(`/recipe/${MOCK_RECIPES[0].id}`)}
             className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-soft cursor-pointer group"
           >
             <img src={MOCK_RECIPES[0].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Trending" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
             <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white mb-2 border border-white/10">
                       🔥 Trending
                    </span>
                    <h3 className="text-white text-xl font-bold">{MOCK_RECIPES[0].title}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                    <Star size={14} className="text-primary fill-primary" />
                    <span className="text-white text-xs font-bold">{MOCK_RECIPES[0].rating}</span>
                  </div>
                </div>
             </div>
           </div>
        </div>
      )}

      {/* Recipe Grid */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-content-light dark:text-content-dark mb-4">
          {activeCategory === 'All' ? 'Recent Recipes' : activeCategory}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredRecipes.map((recipe, idx) => (
            <div 
              key={recipe.id} 
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="group flex flex-col gap-2 cursor-pointer animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-soft">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-colors">
                  <Heart size={16} />
                </button>
              </div>
              
              <div className="px-1">
                <h3 className="font-bold text-content-light dark:text-content-dark text-base leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-subtle-light dark:text-subtle-dark font-medium">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-primary fill-primary" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;