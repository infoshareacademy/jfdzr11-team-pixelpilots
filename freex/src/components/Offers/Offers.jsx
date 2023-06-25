import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './Offers.module.css';

const Offers = () => {
	const [offers, setOffers] = useState([]);
	const offersCollectionRef = collection(db, 'offers');

	const getOffers = async () => {
		try {
			const data = await getDocs(offersCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setOffers(filteredData);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getOffers();
	}, []);

	return (
		<div className={styles.wrapper}>
			<h2>Oferty:</h2>
			{offers
				? offers.map((offer) => (
						<div key={offer.id} className={styles.card}>
							<h4>{offer.title}</h4>
							<p>{offer.description}</p>
							<strong>{offer.hourly_rate}</strong>
							<ul>
								{offer.skills.map((skill) => (
									<li key={skill}>{skill}</li>
								))}
							</ul>
						</div>
				  ))
				: null}
		</div>
	);
};

export default Offers;
