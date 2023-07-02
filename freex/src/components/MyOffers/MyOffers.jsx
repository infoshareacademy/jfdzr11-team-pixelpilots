import styles from './MyOffers.module.css';
import FilterButtons from './FilterButtons/FilterButtons';
import Sort from './Sort/Sort';
import Headers from './Headers/Headers';
import SearchBar from './SearchBar/SearchBar';
import OffersList from './OffersList/OffersList';

const MyOffers = () => {
  const sortByNewest = (data, setData) => {
    const sorted = data.sort(data.date);
    setData(sorted);
  };

  return (
    <div className={styles.my_offers_wrapper}>
      <div className={styles.top_section}>
        <FilterButtons />
        <Sort sortByNewest={sortByNewest} />
      </div>
      <SearchBar />
      <Headers />
      <OffersList />
    </div>
  );
};

export default MyOffers;
