export interface ICategories {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface IPostByCategory {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: ICategories;
}
