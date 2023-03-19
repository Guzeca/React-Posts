import { type RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/mainPage/MainPage';
import { BlockPage } from '@/pages/blockPage/BlockPage';
import { NotFoundPage } from '@/pages/notFoundPage/NotFoundPage';
import { FullCard } from '@/widgets/FullCard/FullCard';

export enum AppRoutes {
  MAIN = 'main',
  BLOCK = 'block',
  FULL_CARD = 'full_card',
  NOT_FOUND = 'not_found'
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.BLOCK]: '/block',
  [AppRoutes.FULL_CARD]: '/block/:id',
  [AppRoutes.NOT_FOUND]: '*'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />
  },
  [AppRoutes.BLOCK]: {
    path: RoutePath.block,
    element: <BlockPage />
  },
  [AppRoutes.FULL_CARD]: {
    path: RoutePath.full_card,
    element: <FullCard />
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
};
