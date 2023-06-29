import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-hot-toast';
import styles from './Offer.module.css';

const Offer = () => {
	const { zlecenieId } = useParams();

	const [offer, setOffer] = useState([]);

	console.log(zlecenieId);
	const getOffer = async () => {
		try {
			const docRef = doc(db, 'offers', zlecenieId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setOffer(docSnap.data());
			} else {
				toast.error('Nie ma takiego zlecenia');
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getOffer();
	}, []);

	return (
		<div className={styles.card}>
			<div className={styles.heading}>
				<h4>{offer.title}</h4>
				<div className={styles.priceWrapper}>
					<strong>{offer.hourly_rate}</strong>
					<span>{offer.payment_method}</span>
				</div>
			</div>
			<span>
				Data publikacji:{' '}
				<span>{offer.date?.toDate().toLocaleDateString()}</span>
			</span>

			<ul className={styles.chips}>
				{offer.skills?.map((skill) => (
					<li key={skill}>{skill}</li>
				))}
			</ul>
			<p>{offer.description}</p>

			<div>
				<span>Nr oferty: {offer?.offer_number}</span>
			</div>
		</div>
	);
};

export default Offer;
