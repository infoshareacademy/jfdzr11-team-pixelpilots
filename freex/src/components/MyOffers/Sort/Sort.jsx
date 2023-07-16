import PopUpMenu from './PopUpMenu';
import styles from './Sort.module.css';
import { useEffect, useRef } from 'react';

const Sort = ({ sortByNewest, sortByOldest, menu, setMenu, handleClick }) => {
  const popUpMenu = useRef();

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (!popUpMenu?.current?.contains(e.target)) {
        setMenu(false);
      }
    };
    addEventListener('mousedown', clickOutsideHandler);
    return () => removeEventListener('mousedown', clickOutsideHandler);
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.sort}>
        <p>Sortuj</p>
        <button onClick={handleClick}>
          <img src="/MyOffers/sort_icon.png" />
        </button>
      </div>
      <div className={styles.manu_parent}>
        {menu ? (
          <PopUpMenu
            sortByNewest={sortByNewest}
            sortByOldest={sortByOldest}
            PopUpMenuRef={popUpMenu}
          />
        ) : null}
      </div>
    </div>
  );
};
export default Sort;
