export interface IPosts {
  id: number;
  title: string;
  price?: number;
  description?: string;
  images: string[];
  creationAt?: string;
  updatedAt?: string;
  category?: ICategory;
}

interface ICategory {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
