export interface ICategories {
  id: number;
  name: string;
}

export interface IPostByCategory {
  id: number;
  title: string;
  rating: number;
  description: string;
  images: string;
  creationAt: string;
  category: string[];
}
