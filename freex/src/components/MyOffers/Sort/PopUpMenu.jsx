import styles from './PopUpMenu.module.css';

const PopUpMenu = ({ sortByNewest }) => {
  return (
    <div className={styles.pop_up}>
      <button onClick={sortByNewest}>od najnowszych</button>
      <button>od najstarszych</button>
      <button>terminy rosnąco</button>
      <button>terminy malejąco</button>
    </div>
  );
};
export default PopUpMenu;
