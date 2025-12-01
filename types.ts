export interface Recipe {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  rating: number;
  time: string;
  servings: number;
  isVegan?: boolean;
  description: string;
  ingredients: string[];
  instructions: string[];
  category: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  timeAgo: string;
  text: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  stats: {
    recipes: number;
    followers: string;
    following: number;
  };
}

// AI Generation Response Schema
export interface GeneratedRecipeData {
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  category: string;
}
