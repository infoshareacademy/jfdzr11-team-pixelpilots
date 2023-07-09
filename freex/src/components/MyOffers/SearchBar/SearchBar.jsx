import styles from './SearchBar.module.css';

const SearchBar = ({ setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form className={styles.search_bar}>
        <input
          onChange={handleChange}
          placeholder="Szukaj"
          className={styles.search_bar_input}
          type="text"
        />
        <div className={styles.search_bar_button}></div>
      </form>
    </div>
  );
};
export default SearchBar;
