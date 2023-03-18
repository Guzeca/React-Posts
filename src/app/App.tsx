import React, { Suspense } from 'react';
import { Sidebar } from '@/widgets/sidebar/Sidebar';
import clsx from 'clsx';
import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme';
import { AppRouter } from '@/app/providers/AppRouter/AppRouter';

function App(): JSX.Element {
  const { theme } = useTheme();
  return (
    <div className={clsx('App', theme)}>
      <Suspense fallback="">
        <Sidebar />
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;
