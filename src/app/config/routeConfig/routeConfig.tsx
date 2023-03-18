import { type RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/mainPage/MainPage';
import { NotFoundPage } from '@/pages/notFoundPage/NotFoundPage';

export enum AppRoutes {
  MAIN = 'main',
  NOT_FOUND = 'not_found'
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NOT_FOUND]: '*'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
};
