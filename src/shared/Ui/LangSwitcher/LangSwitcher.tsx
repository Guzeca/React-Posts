import { Button } from '@/shared/Ui/Button/Button';
import { ReactComponent as Langswitch } from '@/shared/Icons/langswitcher.svg';
import styles from './LangSwitcher.module.scss';
import { useTranslation } from 'react-i18next';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { i18n } = useTranslation();
  const toggleTranslate = async () => {
    try {
      await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={() => void toggleTranslate()} className={className}>
      <Langswitch className={styles.icon} />
    </Button>
  );
};
