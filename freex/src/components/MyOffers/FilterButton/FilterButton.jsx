import styles from './FilterButton.module.css';

const FilterButton = ({ buttonText }) => {
  return <button className={styles.filter_button}>{buttonText}</button>;
};
export default FilterButton;
