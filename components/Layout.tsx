import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Home, Search, PlusSquare, User, ChefHat } from 'lucide-react';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Hide bottom nav on specific pages if needed, but for now we keep it everywhere except Welcome
  if (location.pathname === '/') {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <Outlet />
      </div>
      
      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-[#211c11]/90 backdrop-blur-md border-t border-border-light dark:border-border-dark px-6 py-4 flex justify-between items-center z-50">
        <button 
          onClick={() => navigate('/home')}
          className={`flex flex-col items-center gap-1 ${isActive('/home') ? 'text-primary' : 'text-subtle-light dark:text-subtle-dark'}`}
        >
          <Home size={24} strokeWidth={isActive('/home') ? 2.5 : 2} />
        </button>
        
        <button 
          onClick={() => navigate('/search')}
          className={`flex flex-col items-center gap-1 ${isActive('/search') ? 'text-primary' : 'text-subtle-light dark:text-subtle-dark'}`}
        >
          <Search size={24} strokeWidth={isActive('/search') ? 2.5 : 2} />
        </button>

        <button 
          onClick={() => navigate('/new-recipe')}
          className="flex flex-col items-center gap-1 -mt-8"
        >
          <div className="bg-primary text-background-dark p-4 rounded-full shadow-lg hover:scale-105 transition-transform">
            <PlusSquare size={28} fill="currentColor" className="text-white" strokeWidth={1.5} />
          </div>
        </button>

        <button 
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-primary' : 'text-subtle-light dark:text-subtle-dark'}`}
        >
          <User size={24} strokeWidth={isActive('/profile') ? 2.5 : 2} />
        </button>

        <button 
          onClick={() => alert("AI Chef Chat - Coming Soon!")}
          className={`flex flex-col items-center gap-1 text-subtle-light dark:text-subtle-dark`}
        >
          <ChefHat size={24} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
