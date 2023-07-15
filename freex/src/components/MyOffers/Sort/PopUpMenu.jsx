import styles from './PopUpMenu.module.css';

const PopUpMenu = ({ sortByNewest, sortByOldest, PopUpMenuRef }) => {
  return (
    <div ref={PopUpMenuRef} className={styles.pop_up}>
      <button onClick={() => sortByNewest('date')}>od najnowszych</button>
      <button onClick={() => sortByOldest('date')}>od najstarszych</button>
      <button onClick={() => sortByNewest('end_date')}>terminy rosnąco</button>
      <button onClick={() => sortByOldest('end_date')}>terminy malejąco</button>
    </div>
  );
};
export default PopUpMenu;
