import React, { useState } from 'react';
import { Search, Star, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';

const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Fresh Summer Salad',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop',
    author: 'Chef Anna',
    authorAvatar: '',
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
    authorAvatar: '',
    time: '45 min',
    servings: 4,
    description: 'Homemade pizza with crispy crust.',
    ingredients: [],
    instructions: [],
    category: 'Western'
  },
  {
    id: '3',
    title: 'Blueberry Pancakes Stack',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000&auto=format&fit=crop',
    author: 'Breakfast Club',
    authorAvatar: '',
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
    authorAvatar: '',
    time: '35 min',
    servings: 4,
    description: 'Sweet and savory BBQ chicken.',
    ingredients: [],
    instructions: [],
    category: 'Asian Cuisine'
  }
];

const CATEGORIES = ['All', 'Local Delights', 'Asian Cuisine', 'Desserts', 'Healthy', 'Quick'];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredRecipes = activeCategory === 'All' 
    ? MOCK_RECIPES 
    : MOCK_RECIPES.filter(r => r.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 pt-4 pb-2 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-content-light dark:text-content-dark">Discover Recipes</h1>
        <button className="h-10 w-10 rounded-full bg-subtle-light/20 dark:bg-subtle-dark/20 flex items-center justify-center">
           <img 
             src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" 
             className="w-full h-full rounded-full object-cover" 
             alt="Profile"
           />
        </button>
      </header>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-subtle-light dark:text-subtle-dark" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search for a recipe..."
            className="block w-full pl-10 pr-3 py-3.5 border-none rounded-xl bg-white dark:bg-[#2c2617] text-content-light dark:text-content-dark placeholder-subtle-light dark:placeholder-subtle-dark focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-4 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex items-center justify-center px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
              activeCategory === cat 
                ? 'bg-primary text-content-light' 
                : 'bg-white dark:bg-[#2c2617] text-subtle-light dark:text-subtle-dark border border-transparent dark:border-border-dark'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 pb-4">
        {filteredRecipes.map((recipe) => (
          <div 
            key={recipe.id} 
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md"
          >
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <button className="absolute top-2 right-2 p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-primary hover:text-black transition-colors">
              <Bookmark size={16} />
            </button>

            <div className="absolute bottom-0 w-full p-3 text-white">
              <p className="font-bold text-base leading-tight line-clamp-2 mb-1">{recipe.title}</p>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-primary fill-primary" />
                <span className="text-xs font-medium">{recipe.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
