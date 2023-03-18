import { useTheme, Theme } from '@/app/providers/ThemeProvider';
import { Button } from '@/shared/Ui/Button/Button';
import { ReactComponent as MoonIcon } from '@/shared/Icons/moon.svg';
import { ReactComponent as SunIcon } from '@/shared/Icons/sun.svg';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button className={className} onClick={toggleTheme}>
      {theme === Theme.DARK ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
