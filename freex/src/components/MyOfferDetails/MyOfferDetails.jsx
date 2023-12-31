import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-hot-toast';
import styles from './MyOfferDetails.module.css';
import MyOfferActions from './MyOfferActions/MyOfferActions';
import Applying from './Applying/Applying';

const MyOfferDetails = () => {
  const { ofertaid } = useParams();

  const [offer, setOffer] = useState([]);

  const getOffer = async () => {
    try {
      const docRef = doc(db, 'offers', ofertaid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const offerData = docSnap.data();
        setOffer(offerData);
      } else {
        toast.error('Nie ma takiego zlecenia');
      }
    } catch (error) {
      toast.error('Nie udało się pobrać zlecenia');
    }
  };

  useEffect(() => {
    getOffer();
  }, []);

  let cost = '';
  if (offer.payment_method === 'Jednorazowa płatność') {
    cost = offer.total_payment;
  } else if (offer.payment_method === 'Płatność za godziny') {
    cost = offer.hourly_rate;
  } else if (offer.payment_method === 'Płatność za kamienie milowe')
    cost = offer.milestone_rate;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.main}>
          <div className={styles.heading}>
            <div>
              <h4>{offer.title}</h4>
              <span>
                Data publikacji:{' '}
                <span>{offer.date?.toDate().toLocaleDateString()}</span>
              </span>
            </div>
            <div className={styles.priceWrapper}>
              <strong>{cost}</strong>
              <span>{offer.payment_method}</span>
            </div>
          </div>
          <ul className={styles.chips}>
            {offer.skills?.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <p>{offer.description}</p>
          <div>
            <span>Numer zlecenia: {offer?.offer_number}</span>
          </div>
          <Applying />
        </div>
        <MyOfferActions />
      </div>
    </div>
  );
};

export default MyOfferDetails;
