import FilterButton from '../FilterButton/FilterButton';
import styles from './FilterButtons.module.css';

const FilterButtons = ({ setFilter }) => {
  return (
    <div className={styles.filter_buttons}>
      <FilterButton
        buttonText={'Wszystkie'}
        setFilter={setFilter}
        value="all"
      />
      <FilterButton
        buttonText={'Opublikowane'}
        setFilter={setFilter}
        value="published"
      />
      <FilterButton
        buttonText={'W trakcie'}
        setFilter={setFilter}
        value="pending"
      />
      <FilterButton
        buttonText={'Zakończone'}
        setFilter={setFilter}
        value="closed"
      />
      <FilterButton
        buttonText={'Do opłacenia'}
        setFilter={setFilter}
        value="unpaid"
      />
    </div>
  );
};
export default FilterButtons;
