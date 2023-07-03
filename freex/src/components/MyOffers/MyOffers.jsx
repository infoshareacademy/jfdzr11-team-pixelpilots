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

const MyOffers = () => {
  const { currentUser } = useAuth();
  const [userOffers, setUserOffers] = useState([]);
  const [menu, setMenu] = useState(false);

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
      }));

      setUserOffers(filteredData);
    } catch (error) {
      toast(`Błąd bazy danych`);
    }
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
        <FilterButtons />
        <Sort
          sortByNewest={sortByNewest}
          sortByOldest={sortByOldest}
          menu={menu}
          setMenu={setMenu}
          handleClick={handleClick}
        />
      </div>
      <SearchBar />
      <Headers />
      <OffersList userOffers={userOffers} />
    </div>
  );
};

export default MyOffers;
