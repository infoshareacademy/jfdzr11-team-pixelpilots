import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';

export const getOffers = async (setData) => {
  const offersCollectionRef = collection(db, 'offers');

  try {
    const data = await getDocs(offersCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
    }));
    console.log(filteredData);

    setData(filteredData);
  } catch (error) {
    toast(`Something went wrong`);
  }
};
