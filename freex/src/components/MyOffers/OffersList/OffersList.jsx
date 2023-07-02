import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import useAuth from '../../Context/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import OfferListItem from '../OfferListItem/OfferListItem';

const OffersList = () => {
  const { currentUser } = useAuth();
  const [userOffers, setUserOffers] = useState([]);

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

  return (
    <>
      {userOffers.map((offer, idx) => {
        let cost = '';
        if (offer.payment_method === 'Jednorazowa płatność') {
          cost = offer.total_payment;
        } else if (offer.payment_method === 'Płatność za godziny') {
          cost = offer.hourly_rate;
        } else if (offer.payment_method === 'Płatność za kamienie milowe')
          cost = offer.milestone_rate;

        const date = offer.date.toDate();
        const dateFormat = `${date.getDate()}.${
          date.getMonth() + 1
        }.  ${date.getFullYear()}`;

        return (
          <OfferListItem
            key={idx}
            projectTitle={offer.title}
            publishDate={dateFormat}
            endDate="25.08.2023"
            cost={cost}
            status="Opublikowane"
          />
        );
      })}
    </>
  );
};

export default OffersList;
