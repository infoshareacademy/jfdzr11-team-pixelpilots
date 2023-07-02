import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div>
      <form className={styles.search_bar}>
        <input
          placeholder="Szukaj"
          className={styles.search_bar_input}
          type="text"
        />
        <button className={styles.search_bar_button} type="submit"></button>
      </form>
    </div>
  );
};
export default SearchBar;
