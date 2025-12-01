import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import NewRecipe from './pages/NewRecipe';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="home" element={<Home />} />
          <Route path="recipe/:id" element={<RecipeDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="new-recipe" element={<NewRecipe />} />
          <Route path="search" element={<Home />} /> {/* Reuse Home for search mock */}
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
