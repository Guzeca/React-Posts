import { useState, type FC, useCallback, type ChangeEvent, useRef } from 'react';
import { ReactComponent as Find } from '@/shared/Icons/search.svg';
import styles from './Search.module.scss';
import { useAppDispatch } from '@/app/store/hooks/redux';
import debounce from 'lodash.debounce';
import { setSearchValue } from '@/app/store/category/categorySlice';
import { ReactComponent as Clear } from '@/shared/Icons/clear.svg';

export const Search: FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str.toLowerCase()));
    }, 500),
    []
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = (): void => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        className={styles.input}
        value={value}
        type="text"
        placeholder="Поиск..."
      />
      <Find className={styles.find} />
      {value && <Clear onClick={onClickClear} className={styles.clear} />}
    </div>
  );
};
