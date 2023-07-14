import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../Context/AuthContext';
import { useEffect, useState } from 'react';
import OfferForm from '../../AddOffer/AddOffer/OfferForm';
import { toast } from 'react-hot-toast';

const EditOffer = () => {
  const { ofertaid } = useParams();
  const { currentUser } = useAuth();
  const [chosenSkills, setChosenSkills] = useState([]);
  const [offer, setOffer] = useState([]);

  const getOffer = async () => {
    try {
      const docRef = doc(db, 'offers', ofertaid);
      const docSnap = await getDoc(docRef);
      if (ofertaid) {
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOfferData = {
      userId: currentUser.uid,
      title: e.target.title.value,
      description: e.target.description.value,
      skills: chosenSkills,
      payment_method: e.target.payment_method.value,
      hourly_rate: `${e.target.hourly_rate?.value} zł / godz.`,
      milestone_rate: `${e.target.milestone_rate?.value} zł / kamień milowy`,
      total_payment: `${e.target.total_payment?.value} zł`,
      premium_plan: {
        highlight: e.target.highlight.checked,
        analysis: e.target.analysis.checked,
        support: e.target.support.checked,
        contracts: e.target.contracts.checked,
      },
      date: serverTimestamp(),
    };

    const docRef = doc(db, 'offers', ofertaid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      if (docData !== updatedOfferData) {
        await updateDoc(docRef, updatedOfferData);
      }
    } else {
      await setDoc(docRef, updatedOfferData);
    }
    navigate(`/mojeoferty/${ofertaid}`);
    toast.success('Twoja oferta została zaktualizowana');
  };

  return (
    <OfferForm
      setChosenSkills={setChosenSkills}
      chosenSkills={chosenSkills}
      offer={offer}
      handleSubmit={handleSubmit}
      submitText={'Zapisz zmiany'}
    />
  );
};
export default EditOffer;
