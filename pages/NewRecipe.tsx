import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Plus, Minus, Wand2, Loader2, ChevronRight, X } from 'lucide-react';
import { generateRecipeDetails } from '../services/geminiService';
import { GeneratedRecipeData } from '../types';

const NewRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState<{amt: string, name: string}[]>([{amt: '', name: ''}]);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [category, setCategory] = useState('');

  const handleMagicFill = async () => {
    if (!title) {
      alert("Please enter a recipe name first!");
      return;
    }
    setLoading(true);
    const data: GeneratedRecipeData | null = await generateRecipeDetails(title);
    setLoading(false);

    if (data) {
      setDescription(data.description);
      setPrepTime(data.prepTime);
      setCookTime(data.cookTime);
      setServings(data.servings.toString());
      setIngredients(data.ingredients.map(i => {
        const parts = i.split(' ');
        if (parts.length > 1 && !isNaN(parseFloat(parts[0]))) {
          return { amt: parts[0] + ' ' + parts[1], name: parts.slice(2).join(' ') };
        }
        return { amt: '1', name: i };
      }));
      setInstructions(data.instructions);
      setCategory(data.category);
    } else {
      alert("Could not generate recipe. Try again!");
    }
  };

  const addIngredient = () => setIngredients([...ingredients, {amt: '', name: ''}]);
  const removeIngredient = (idx: number) => setIngredients(ingredients.filter((_, i) => i !== idx));
  const updateIngredient = (idx: number, field: 'amt' | 'name', val: string) => {
    const newIngs = [...ingredients];
    newIngs[idx][field] = val;
    setIngredients(newIngs);
  };

  const addInstruction = () => setInstructions([...instructions, '']);
  const removeInstruction = (idx: number) => setInstructions(instructions.filter((_, i) => i !== idx));
  const updateInstruction = (idx: number, val: string) => {
    const newInst = [...instructions];
    newInst[idx] = val;
    setInstructions(newInst);
  };

  return (
    <div className="flex flex-col min-h-full bg-background-light dark:bg-background-dark text-content-light dark:text-content-dark">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 dark:border-white/5 sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl z-30">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">New Recipe</h1>
        <div className="w-10"></div>
      </div>

      <main className="flex-1 pb-32">
        
        {/* Magic Fill Section */}
        <div className="px-6 py-6">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-3xl border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wand2 size={120} />
            </div>
            <h2 className="text-xl font-bold mb-2 text-primary">AI Chef Assist</h2>
            <p className="text-sm text-subtle-light dark:text-subtle-dark mb-4 max-w-[80%]">
              Enter a recipe name below and let AI generate the ingredients and steps for you.
            </p>
          </div>
        </div>

        {/* Media Upload */}
        <div className="px-6 mb-8">
          <div className="w-full aspect-video rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-surface-dark/50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-surface-dark transition-all group">
            <div className="bg-white dark:bg-black p-4 rounded-2xl mb-4 shadow-soft group-hover:scale-110 transition-transform text-primary">
              <ImagePlus size={32} />
            </div>
            <p className="font-bold text-lg">Add Cover Photo</p>
            <p className="text-sm text-subtle-light dark:text-subtle-dark">Up to 12MB</p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="px-6 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="font-bold text-base ml-1">Recipe Name</label>
              <button 
                onClick={handleMagicFill}
                disabled={loading}
                className="text-xs flex items-center gap-1.5 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full font-bold hover:opacity-80 disabled:opacity-50 transition-all shadow-lg"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                {loading ? 'Generating...' : 'Auto-Fill'}
              </button>
            </div>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Homestyle Chicken Soup"
              className="w-full h-14 px-5 rounded-2xl bg-surface-light dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary/50 text-lg font-medium shadow-soft placeholder:font-normal placeholder:text-subtle-light"
            />
          </div>

          <div className="space-y-3">
            <label className="font-bold text-base ml-1">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your recipe..."
              className="w-full h-32 p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary/50 text-base resize-none shadow-soft placeholder:text-subtle-light"
            />
          </div>

          {/* Times */}
          <div className="grid grid-cols-3 gap-3">
             <div className="space-y-2">
                <label className="font-bold text-sm ml-1 text-subtle-light dark:text-subtle-dark">Prep Time</label>
                <input 
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="20 min"
                  className="w-full h-12 px-2 rounded-2xl bg-surface-light dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary/50 shadow-soft text-center font-bold"
                />
             </div>
             <div className="space-y-2">
                <label className="font-bold text-sm ml-1 text-subtle-light dark:text-subtle-dark">Cook Time</label>
                <input 
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  placeholder="45 min"
                  className="w-full h-12 px-2 rounded-2xl bg-surface-light dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary/50 shadow-soft text-center font-bold"
                />
             </div>
             <div className="space-y-2">
                <label className="font-bold text-sm ml-1 text-subtle-light dark:text-subtle-dark">Servings</label>
                <input 
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  placeholder="4"
                  type="number"
                  className="w-full h-12 px-2 rounded-2xl bg-surface-light dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary/50 shadow-soft text-center font-bold"
                />
             </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="px-6 mt-10 space-y-4">
           <h2 className="text-xl font-bold ml-1">Ingredients</h2>
           <div className="space-y-3">
             {ingredients.map((ing, idx) => (
               <div key={idx} className="flex gap-3 animate-slide-up">
                  <input 
                    placeholder="Qty" 
                    value={ing.amt}
                    onChange={(e) => updateIngredient(idx, 'amt', e.target.value)}
                    className="w-1/4 h-12 px-4 rounded-2xl bg-surface-light dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary/50 shadow-soft font-medium"
                  />
                  <input 
                    placeholder="Ingredient name" 
                    value={ing.name}
                    onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                    className="flex-1 h-12 px-4 rounded-2xl bg-surface-light dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary/50 shadow-soft font-medium"
                  />
                  {ingredients.length > 1 && (
                    <button onClick={() => removeIngredient(idx)} className="p-3 text-subtle-light hover:text-red-500 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft transition-colors">
                      <Minus size={20} />
                    </button>
                  )}
               </div>
             ))}
           </div>
           <button 
             onClick={addIngredient}
             className="flex items-center gap-2 px-5 py-4 bg-gray-100 dark:bg-white/5 text-content-light dark:text-content-dark rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors w-full justify-center"
           >
             <Plus size={18} /> Add Ingredient
           </button>
        </div>

        {/* Instructions */}
        <div className="px-6 mt-10 space-y-4">
           <h2 className="text-xl font-bold ml-1">Instructions</h2>
           <div className="space-y-4">
             {instructions.map((inst, idx) => (
               <div key={idx} className="flex gap-4 items-start animate-slide-up">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0 mt-3 shadow-glow">
                    {idx + 1}
                  </div>
                  <div className="flex-1 relative">
                    <textarea 
                      value={inst}
                      onChange={(e) => updateInstruction(idx, e.target.value)}
                      placeholder={`Step ${idx + 1}...`}
                      className="w-full h-28 p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary/50 shadow-soft resize-none font-medium leading-relaxed"
                    />
                     {instructions.length > 1 && (
                      <button onClick={() => removeInstruction(idx)} className="absolute top-2 right-2 p-1.5 text-subtle-light hover:text-red-500 bg-white/50 dark:bg-black/20 rounded-lg backdrop-blur-sm">
                        <X size={14} />
                      </button>
                    )}
                  </div>
               </div>
             ))}
           </div>
           <button 
             onClick={addInstruction}
             className="flex items-center gap-2 px-5 py-4 bg-gray-100 dark:bg-white/5 text-content-light dark:text-content-dark rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors w-full justify-center"
           >
             <Plus size={18} /> Add Step
           </button>
        </div>

        {/* Category */}
        <div className="px-6 mt-10">
           <h2 className="text-xl font-bold mb-4 ml-1">Category</h2>
           <button className="w-full flex items-center justify-between p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft hover:ring-2 hover:ring-primary/50 transition-all">
             <span className={`font-medium ${category ? "text-content-light dark:text-content-dark" : "text-subtle-light"}`}>
               {category || "Select a category"}
             </span>
             <ChevronRight size={20} className="text-subtle-light" />
           </button>
        </div>

      </main>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light via-background-light/90 to-transparent dark:from-background-dark dark:via-background-dark/90 pt-20 pointer-events-none flex justify-center z-40">
        <div className="w-full max-w-md pointer-events-auto">
          <button 
            className="w-full h-16 bg-primary rounded-2xl text-white font-bold text-lg shadow-glow hover:scale-[1.02] transition-all"
            onClick={() => {
              alert("Recipe Published!");
              navigate('/home');
            }}
          >
            Publish Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;