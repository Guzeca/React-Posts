import { Suspense } from 'react';
import { Sidebar } from '@/widgets/sidebar/Sidebar';
import clsx from 'clsx';
import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme';
import { AppRouter } from '@/app/providers/AppRouter/AppRouter';
import { Provider } from 'react-redux';
import { setupStore } from '@/app/store/store';

const store = setupStore();

function App(): JSX.Element {
  const { theme } = useTheme();
  return (
    <Provider store={store}>
      <div className={clsx('App', theme)}>
        <Suspense fallback="">
          <Sidebar />
          <AppRouter />
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
