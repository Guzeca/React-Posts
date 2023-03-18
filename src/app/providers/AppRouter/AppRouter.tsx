import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { type FC } from 'react';
import { routeConfig } from '@/app/config/routeConfig/routeConfig';

export const AppRouter: FC = () => (
  <Suspense fallback={<div />}>
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route key={path} path={path} element={<div className="pageWrapper">{element}</div>} />
      ))}
    </Routes>
  </Suspense>
);
