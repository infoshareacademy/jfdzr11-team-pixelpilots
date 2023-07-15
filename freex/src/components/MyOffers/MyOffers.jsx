import styles from './MyOffers.module.css';
import FilterButtons from './FilterButtons/FilterButtons';
import Sort from './Sort/Sort';
import Headers from './Headers/Headers';
import SearchBar from './SearchBar/SearchBar';
import OffersList from './OffersList/OffersList';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useAuth from '../../components/Context/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../UI/Loader/Loader';

const MyOffers = () => {
  const { currentUser } = useAuth();
  const [userOffers, setUserOffers] = useState([]);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const getFilteredItems = (searchPhrase, filterClicked, items) => {
    const searched = items.filter((offer) =>
      offer.title.toLowerCase().includes(searchPhrase)
    );
    const filtered = searched.filter((offer) => offer.status === filterClicked);
    return filterClicked !== 'all' ? filtered : searched;
  };

  const filteredItems = getFilteredItems(search, filter, userOffers);

  const handleClick = () => {
    setMenu(!menu);
  };
  const q = query(
    collection(db, 'offers'),
    where('userId', '==', currentUser.uid)
  );

  const getOffers = async () => {
    try {
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUserOffers(filteredData);
    } catch (error) {
      toast(`Błąd bazy danych`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getOffers();
  }, []);

  const sortByNewest = (property) => {
    const sorted = [...userOffers].sort((a, b) =>
      a.date.toDate() < b[property].toDate() ? 1 : -1
    );
    setUserOffers(sorted);
    handleClick();
  };

  const sortByOldest = (property) => {
    const sorted = [...userOffers].sort((a, b) =>
      a.date.toDate() > b[property].toDate() ? 1 : -1
    );
    setUserOffers(sorted);
    handleClick();
  };

  return (
    <div className={styles.my_offers_wrapper}>
      <div className={styles.top_section}>
        <FilterButtons setFilter={setFilter} />
        <Sort
          sortByNewest={sortByNewest}
          sortByOldest={sortByOldest}
          menu={menu}
          setMenu={setMenu}
          handleClick={handleClick}
        />
      </div>
      <SearchBar setSearch={setSearch} />
      <Headers />
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <OffersList filteredItems={filteredItems} />
      )}
    </div>
  );
};

export default MyOffers;
