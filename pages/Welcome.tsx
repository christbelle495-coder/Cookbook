import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen w-full bg-background-light dark:bg-background-dark max-w-md mx-auto p-4">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-sm px-4 mb-8">
          <div className="aspect-square w-full rounded-3xl overflow-hidden shadow-2xl relative">
             <img 
               src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop" 
               alt="Cooking Bowl" 
               className="object-cover w-full h-full"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
        
        <h1 className="text-content-light dark:text-content-dark text-[32px] font-bold leading-tight text-center px-4 mb-3">
          Welcome to Cookbook
        </h1>
        <p className="text-content-light/80 dark:text-content-dark/80 text-base text-center max-w-xs px-4">
          Discover and share recipes from kitchens around the world.
        </p>
      </div>

      <div className="flex flex-col gap-3 pb-8 w-full px-4">
        <button 
          onClick={() => navigate('/home')}
          className="w-full h-14 bg-primary rounded-xl text-content-light font-bold text-lg hover:bg-yellow-500 transition-colors"
        >
          Browse Recipes
        </button>
        <button 
          onClick={() => navigate('/home')}
          className="w-full h-14 bg-transparent border-2 border-primary/20 rounded-xl text-content-light dark:text-content-dark font-bold text-lg hover:bg-primary/5 transition-colors"
        >
          Log In or Create Account
        </button>
      </div>
    </div>
  );
};

export default Welcome;
