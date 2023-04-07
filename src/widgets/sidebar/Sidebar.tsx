import { type FC, useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { ThemeSwitcher } from '@/shared/Ui/ThemeSwitcher';
import { LangSwitcher } from '@/shared/Ui/LangSwitcher/LangSwitcher';
import clsx from 'clsx';
import { Button, ButtonTheme } from '@/shared/Ui/Button/Button';

interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const storedSidebarCollapse = localStorage.getItem('isSidebarCollapsed');
    if (storedSidebarCollapse) {
      setCollapsed(storedSidebarCollapse === 'true');
    }
  }, []);
  const sidebarToggle = (): void => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem('isSidebarCollapsed', JSON.stringify(newCollapsed));
  };
  return (
    <div className={clsx(collapsed && styles.sidebar_collapsed, styles.sidebar)}>
      <div className={clsx(collapsed && styles.children_collapsed)}>{children}</div>
      <div className={clsx(collapsed && styles.collapsed_switchers, styles.switchers_wrapper)}>
        <ThemeSwitcher className={styles.switchers} />
        <LangSwitcher className={styles.switchers} />
      </div>
      <Button theme={ButtonTheme.SQUARE} className={styles.collapseBtn} onClick={sidebarToggle}>
        {collapsed ? '>' : '<'}
      </Button>
    </div>
  );
};
