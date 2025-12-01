import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Plus, Minus, Wand2, Loader2, ChevronRight, X } from 'lucide-react';
import { generateRecipeDetails } from '../services/geminiService';
import { GeneratedRecipeData } from '../types';

const NewRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
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
        // Simple heuristic to split amount and name if possible, otherwise put all in name
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
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-content-light dark:text-content-dark">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-light dark:border-border-dark sticky top-0 bg-background-light dark:bg-background-dark z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">New Recipe</h1>
        <div className="w-10"></div>
      </div>

      <main className="flex-1 pb-32">
        {/* Progress */}
        <div className="px-4 py-4">
          <p className="text-sm font-medium mb-2">Step 1 of 4</p>
          <div className="h-2 w-full bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/4 rounded-full"></div>
          </div>
        </div>

        {/* Media Upload */}
        <div className="px-4 mb-6">
          <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-border-light dark:border-border-dark bg-subtle-light/10 dark:bg-subtle-dark/10 flex flex-col items-center justify-center cursor-pointer hover:bg-subtle-light/20 transition-colors">
            <div className="bg-white dark:bg-background-dark p-4 rounded-full mb-3 shadow-sm">
              <ImagePlus size={32} className="text-primary" />
            </div>
            <p className="font-semibold text-content-light dark:text-content-dark">Upload Photo or Video</p>
            <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1">Tap to add media</p>
          </div>
        </div>

        {/* Basic Info & Magic Button */}
        <div className="px-4 space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="font-semibold text-base">Recipe Name</label>
              <button 
                onClick={handleMagicFill}
                disabled={loading}
                className="text-xs flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                {loading ? 'Generating...' : 'Magic Fill'}
              </button>
            </div>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Homestyle Chicken Soup"
              className="w-full h-14 px-4 rounded-xl bg-white dark:bg-[#2c2617] border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-base">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your recipe..."
              className="w-full h-32 p-4 rounded-xl bg-white dark:bg-[#2c2617] border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 text-base resize-none"
            />
          </div>

          {/* Times */}
          <div className="grid grid-cols-3 gap-3">
             <div className="space-y-2">
                <label className="font-semibold text-sm">Prep Time</label>
                <input 
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="20 min"
                  className="w-full h-12 px-3 rounded-xl bg-white dark:bg-[#2c2617] border border-border-light dark:border-border-dark focus:border-primary focus:ring-0"
                />
             </div>
             <div className="space-y-2">
                <label className="font-semibold text-sm">Cook Time</label>
                <input 
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  placeholder="45 min"
                  className="w-full h-12 px-3 rounded-xl bg-white dark:bg-[#2c2617] border border-border-light dark:border-border-dark focus:border-primary focus:ring-0"
                />
             </div>
             <div className="space-y-2">
                <label className="font-semibold text-sm">Servings</label>
                <input 
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  placeholder="4"
                  type="number"
                  className="w-full h-12 px-3 rounded-xl bg-white dark:bg-[#2c2617] border border-border-light dark:border-border-dark focus:border-primary focus:ring-0"
                />
             </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="px-4 mt-8 space-y-4">
           <h2 className="text-xl font-bold">Ingredients</h2>
           <div className="space-y-3">
             {ingredients.map((ing, idx) => (
               <div key={idx} className="flex gap-2">
                  <input 
                    placeholder="1 cup" 
                    value={ing.amt}
                    onChange={(e) => updateIngredient(idx, 'amt', e.target.value)}
                    className="w-1/4 h-12 px-3 rounded-xl bg-white dark:bg-[#2c2617] border border-border-light dark:border-border-dark focus:border-primary focus:ring-0"
                  />
                  <input 
                    placeholder="Ingredient name" 
                    value={ing.name}
                    onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                    className="flex-1 h-12 px-3 rounded-xl bg-white dark:bg-[#2c2617] border border-border-light dark:border-border-dark focus:border-primary focus:ring-0"
                  />
                  {ingredients.length > 1 && (
                    <button onClick={() => removeIngredient(idx)} className="p-2 text-subtle-light hover:text-red-500">
                      <Minus size={20} />
                    </button>
                  )}
               </div>
             ))}
           </div>
           <button 
             onClick={addIngredient}
             className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-colors"
           >
             <Plus size={18} /> Add Ingredient
           </button>
        </div>

        {/* Instructions */}
        <div className="px-4 mt-8 space-y-4">
           <h2 className="text-xl font-bold">Instructions</h2>
           <div className="space-y-4">
             {instructions.map((inst, idx) => (
               <div key={idx} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-subtle-light/20 flex items-center justify-center font-bold text-sm shrink-0 mt-2">
                    {idx + 1}
                  </div>
                  <div className="flex-1 relative">
                    <textarea 
                      value={inst}
                      onChange={(e) => updateInstruction(idx, e.target.value)}
                      placeholder={`Step ${idx + 1}...`}
                      className="w-full h-24 p-3 rounded-xl bg-white dark:bg-[#2c2617] border border-border-light dark:border-border-dark focus:border-primary focus:ring-0 resize-none"
                    />
                     {instructions.length > 1 && (
                      <button onClick={() => removeInstruction(idx)} className="absolute top-2 right-2 p-1 text-subtle-light hover:text-red-500 bg-white/50 rounded-full">
                        <X size={14} />
                      </button>
                    )}
                  </div>
               </div>
             ))}
           </div>
           <button 
             onClick={addInstruction}
             className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-colors"
           >
             <Plus size={18} /> Add Step
           </button>
        </div>

        {/* Category */}
        <div className="px-4 mt-8">
           <h2 className="text-xl font-bold mb-3">Category</h2>
           <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#2c2617] border border-border-light dark:border-border-dark rounded-xl">
             <span className={category ? "text-content-light dark:text-content-dark" : "text-subtle-light"}>
               {category || "Select a category"}
             </span>
             <ChevronRight size={20} className="text-subtle-light" />
           </button>
        </div>

      </main>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-12">
        <div className="max-w-md mx-auto">
          <button 
            className="w-full h-14 bg-primary rounded-xl text-content-light font-bold text-lg shadow-lg hover:shadow-xl hover:bg-yellow-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
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
