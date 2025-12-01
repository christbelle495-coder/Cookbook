import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Home, Search, Plus, User, Sparkles } from 'lucide-react';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const showNav = location.pathname !== '/';

  return (
    // Outer wrapper: Darker backdrop to make the app frame pop
    <div className="min-h-[100dvh] w-full flex justify-center bg-[#f0f2f5] dark:bg-black font-sans selection:bg-primary/30">
      
      {/* Mobile App Frame */}
      <div className="w-full max-w-md bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden flex flex-col relative h-[100dvh] sm:rounded-[2.5rem] sm:my-4 sm:h-[calc(100dvh-2rem)] sm:border-[8px] sm:border-white dark:sm:border-[#1E1E1E]">
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative pb-24">
          <Outlet />
        </div>
        
        {/* Glassmorphism Bottom Navigation */}
        {showNav && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-soft rounded-3xl px-6 py-4 flex justify-between items-center z-50">
              <button 
                onClick={() => navigate('/home')}
                className={`flex flex-col items-center justify-center w-10 h-10 transition-all duration-300 ${isActive('/home') ? 'text-primary scale-110' : 'text-subtle-light dark:text-subtle-dark hover:text-primary/70'}`}
              >
                <Home size={24} strokeWidth={isActive('/home') ? 2.5 : 2} />
              </button>
              
              <button 
                onClick={() => navigate('/search')}
                className={`flex flex-col items-center justify-center w-10 h-10 transition-all duration-300 ${isActive('/search') ? 'text-primary scale-110' : 'text-subtle-light dark:text-subtle-dark hover:text-primary/70'}`}
              >
                <Search size={24} strokeWidth={isActive('/search') ? 2.5 : 2} />
              </button>

              {/* Floating Action Button for Add */}
              <button 
                onClick={() => navigate('/new-recipe')}
                className="relative -top-8 group"
              >
                <div className="bg-primary text-white p-4 rounded-full shadow-glow transform transition-all duration-300 group-hover:scale-105 group-active:scale-95 flex items-center justify-center">
                  <Plus size={28} strokeWidth={2.5} />
                </div>
              </button>

              <button 
                onClick={() => alert("AI Chef Chat - Coming Soon!")}
                className={`flex flex-col items-center justify-center w-10 h-10 transition-all duration-300 text-subtle-light dark:text-subtle-dark hover:text-primary/70`}
              >
                <Sparkles size={24} strokeWidth={2} />
              </button>

              <button 
                onClick={() => navigate('/profile')}
                className={`flex flex-col items-center justify-center w-10 h-10 transition-all duration-300 ${isActive('/profile') ? 'text-primary scale-110' : 'text-subtle-light dark:text-subtle-dark hover:text-primary/70'}`}
              >
                <User size={24} strokeWidth={isActive('/profile') ? 2.5 : 2} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};