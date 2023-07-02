import FilterButton from '../FilterButton/FilterButton';
import styles from './FilterButtons.module.css';

const FilterButtons = () => {
  return (
    <div className={styles.filter_buttons}>
      <FilterButton buttonText={'Wszystkie'} />
      <FilterButton buttonText={'Opublikowane'} />
      <FilterButton buttonText={'W trakcie'} />
      <FilterButton buttonText={'Zakończone'} />
      <FilterButton buttonText={'Do opłacenia'} />
    </div>
  );
};
export default FilterButtons;
