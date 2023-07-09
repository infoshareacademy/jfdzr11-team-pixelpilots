import styles from './FilterButton.module.css';

const FilterButton = ({ buttonText, setFilter, value }) => {
  return (
    <button
      className={styles.filter_button}
      onClick={(e) => setFilter(e.target.value)}
      value={value}
    >
      {buttonText}
    </button>
  );
};
export default FilterButton;
