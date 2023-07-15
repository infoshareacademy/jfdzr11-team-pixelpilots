import {
  getDoc,
  getDocs,
  doc,
  query,
  collection,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../config/firebase';
import { useParams } from 'react-router-dom';
import styles from './Applying.module.css';
import Loader from '../../UI/Loader/Loader';
import Applicant from './Applicant/Applicant';

const Applying = () => {
  const { ofertaid } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApplicantsIds = async () => {
    const docRef = doc(db, 'offers', ofertaid);
    try {
      const docSnap = await getDoc(docRef);
      const offer = docSnap.data();
      const applicantsIds = offer.applying;
      getApplicants(applicantsIds);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getApplicants = async (array) => {
    const collectionRef = collection(db, 'users');
    try {
      const q = query(collectionRef, where('id', 'in', array));
      const querySnap = await getDocs(q);
      const applicantsData = querySnap.docs.map((doc) => ({
        ...doc.data(),
      }));
      setApplicants(applicantsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplicantsIds();
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  return (
    <div className={styles.wrapper}>
      <p>{`Zgłaszający się (${applicants.length})`}</p>
      {applicants.map((applicant, idx) => {
        return <Applicant key={idx} applicant={applicant} />;
      })}
    </div>
  );
};
export default Applying;
