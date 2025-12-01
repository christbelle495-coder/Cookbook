import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col h-full w-full">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop" 
          alt="Cooking Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-8">
        <div className="flex-grow flex flex-col justify-end pb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full w-fit mb-6 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-white text-xs font-bold tracking-wide uppercase">AI Powered Kitchen</span>
          </div>

          <h1 className="text-white text-5xl font-bold leading-[1.1] mb-4 tracking-tight">
            Cook <br />
            <span className="text-primary">Smarter,</span> <br />
            Eat Better.
          </h1>
          
          <p className="text-gray-300 text-lg leading-relaxed max-w-xs mb-8">
            Personalized recipes, AI generation, and a community of food lovers.
          </p>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => navigate('/home')}
              className="group w-full h-16 bg-primary hover:bg-primary/90 rounded-2xl flex items-center justify-between px-6 text-white font-bold text-lg transition-all shadow-glow"
            >
              <span>Get Started</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => navigate('/home')}
              className="w-full h-16 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-2xl text-white font-bold text-lg transition-all"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;