import PopUpMenu from './PopUpMenu';
import styles from './Sort.module.css';
import { useState } from 'react';

const Sort = ({ sortByNewest }) => {
  const [menu, setMenu] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sort}>
        <p>Sortuj</p>
        <button onClick={() => setMenu(!menu)} onBlur={() => setMenu(false)}>
          <img src="../../../../public/MyOffers/sort_icon.png" />
        </button>
      </div>
      <div>{menu ? <PopUpMenu sortByNewest={sortByNewest} /> : null}</div>
    </div>
  );
};
export default Sort;
