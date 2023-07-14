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

const Applying = () => {
  const { ofertaid } = useParams();
  const [applicants, setApplicants] = useState([]);

  const getApplicantsIds = async () => {
    const docRef = doc(db, 'offers', ofertaid);
    const docSnap = await getDoc(docRef);
    const offer = docSnap.data();
    const applicantsIds = offer.applying;
    getApplicants(applicantsIds);
  };

  const getApplicants = async (array) => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef, where('id', 'in', array));
    const querySnap = await getDocs(q);
    const applicantsData = querySnap.docs.map((doc) => ({
      ...doc.data(),
    }));
    setApplicants(applicantsData);
  };

  useEffect(() => {
    getApplicantsIds();
  }, []);
  return applicants.length > 0 ? (
    <div className={styles.wrapper}>
      <p>{`Zgłaszający się (${applicants.length})`}</p>
      {applicants.map((applicant, idx) => {
        return (
          <div className={styles.applicant} key={idx}>
            <img
              className={styles.applicant_picture}
              src={applicant.imgURL}
              alt="user profile picture"
            />
            <div className={styles.info}>
              <p className={styles.name}>{applicant.userName}</p>
              <p className={styles.description}>{applicant.description}</p>
            </div>
            <div className={styles.rate}>
              {applicant.hourlyRate} PLN / godz.
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <Loader />
  );
};
export default Applying;
