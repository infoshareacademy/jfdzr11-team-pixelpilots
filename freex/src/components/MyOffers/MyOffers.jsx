import styles from './MyOffers.module.css';
import FilterButtons from './FilterButtons/FilterButtons';
import Sort from './Sort/Sort';
import Headers from './Headers/Headers';
import SearchBar from './SearchBar/SearchBar';

const MyOffers = () => {
  return (
    <div className={styles.my_offers_wrapper}>
      <div className={styles.top_section}>
        <FilterButtons />
        <Sort />
      </div>
      <SearchBar />
      <Headers />
    </div>
  );
};

export default MyOffers;
