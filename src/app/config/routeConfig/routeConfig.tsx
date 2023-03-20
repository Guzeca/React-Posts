import { type RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/mainPage/MainPage';
import { NotFoundPage } from '@/pages/notFoundPage/NotFoundPage';
import { BlogPage } from '@/pages/blogPage/BlogPage';
import { FullCard } from '@/widgets/FullArticle/FullArticle';

export enum AppRoutes {
  MAIN = 'main',
  blog = 'blog',
  FULL_ARTICLE = 'full_article',
  NOT_FOUND = 'not_found'
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.blog]: '/blog',
  [AppRoutes.FULL_ARTICLE]: '/blog/article/:id',
  [AppRoutes.NOT_FOUND]: '*'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />
  },
  [AppRoutes.blog]: {
    path: RoutePath.blog,
    element: <BlogPage />
  },
  [AppRoutes.FULL_ARTICLE]: {
    path: RoutePath.full_article,
    element: <FullCard />
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
};
