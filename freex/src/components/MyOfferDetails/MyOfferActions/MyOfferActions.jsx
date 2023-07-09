import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton';
import styles from './MyOfferActions.module.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { toast } from 'react-hot-toast';

const MyOfferActions = () => {
  const { ofertaid } = useParams();
  const navigate = useNavigate();

  const docRef = doc(db, 'offers', ofertaid);

  const deleteOffer = async () => {
    try {
      await deleteDoc(docRef);
      toast.success('Oferta usunięta pomyślnie');
      navigate('/mojeoferty');
    } catch (error) {
      toast.error('Nie udało się usunąć oferty');
    }
  };

  return (
    <div className={styles.wrapper}>
      <PrimaryButton
        onClick={() => navigate(`/mojeoferty/${ofertaid}/edit`)}
        className={styles.button}
      >
        Edytuj
      </PrimaryButton>
      <PrimaryButton className={styles.button}>
        Podgląd na stronie głównej
      </PrimaryButton>
      <PrimaryButton onClick={deleteOffer} className={styles.button}>
        Usuń
      </PrimaryButton>
    </div>
  );
};
export default MyOfferActions;
