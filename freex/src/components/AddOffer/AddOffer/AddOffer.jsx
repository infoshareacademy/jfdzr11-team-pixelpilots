import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../../../config/firebase';
import useAuth from '../../Context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { serverTimestamp } from 'firebase/firestore';
import { customAlphabet } from 'nanoid';
import OfferForm from './OfferForm';

const AddOffer = () => {
  const { currentUser } = useAuth();
  const [chosenSkills, setChosenSkills] = useState([]);

  const navigate = useNavigate();

  const nanoid = customAlphabet('1234567890', 10);

  const offersCollectionRef = collection(db, 'offers');

  const offer_number = nanoid();

  const uploadFile = async (e) => {
    const file = e.target.add_file.files[0];
    if (file) {
      const fileRef = ref(storage, `offerImages/${offer_number}`);
      await uploadBytesResumable(fileRef, file);
      const imageURL = await getDownloadURL(fileRef);
      return imageURL;
    } else {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadFile(e);

    const offerData = {
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
      imageUrl,
      offer_number,
    };

    try {
      await addDoc(offersCollectionRef, offerData);
      toast.success('Dodano ofertę');
      navigate('/mojeoferty');
    } catch (error) {
      toast.error('Nie udało się dodać oferty');
    }
  };

  return (
    <OfferForm
      chosenSkills={chosenSkills}
      setChosenSkills={setChosenSkills}
      handleSubmit={handleSubmit}
      submitText={'Opublikuj'}
    />
  );
};

export default AddOffer;
