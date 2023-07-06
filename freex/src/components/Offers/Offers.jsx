import { Fragment, useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
	orderBy,
} from 'firebase/firestore';
import styles from './Offers.module.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { skillBase } from '../../utils/skillBase';

const Offers = () => {
	const [offers, setOffers] = useState([]);
	const offersCollectionRef = collection(db, 'offers');

	const getOffers = (querySnapshot) => {
		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	};

	const filteredOffers = async (searchTerm) => {
		const q = query(
			offersCollectionRef,
			searchTerm
				? where('skills', 'array-contains', searchTerm)
				: orderBy('date', 'desc')
		);

		try {
			const querySnapshot = await getDocs(q);
			const offers = getOffers(querySnapshot);

			if (searchTerm) {
				offers.sort((a, b) => b.date.toMillis() - a.date.toMillis());
			}

			setOffers(offers);
		} catch (error) {
			toast.error('Wystąpił błąd podczas pobierania danych');
		}
	};

	useEffect(() => {
		onSnapshot(
			query(offersCollectionRef, orderBy('date', 'desc')),
			(querySnapshot) => {
				const offers = getOffers(querySnapshot);
				setOffers(offers);
			}
		);
	}, []);

	return (
		<div className={styles.wrapper}>
			<h2>Oferty:</h2>
			<form className={styles.form}>
				<input
					type="radio"
					name="skill"
					id="all"
					value=""
					defaultChecked
					onChange={(e) => filteredOffers(e.target.value)}
				/>
				<label htmlFor="all">Wyświetl wszystkie</label>
				{skillBase.map((skill) => (
					<Fragment key={skill}>
						<input
							type="radio"
							name="skill"
							id={skill}
							value={skill}
							onChange={(e) => filteredOffers(e.target.value)}
						/>
						<label htmlFor={skill}>{skill}</label>
					</Fragment>
				))}
			</form>
			{offers
				? offers.map((offer) => {
						let cost = '';
						if (offer.payment_method === 'Jednorazowa płatność') {
							cost = offer.total_payment;
						} else if (
							offer.payment_method === 'Płatność za godziny'
						) {
							cost = offer.hourly_rate;
						} else if (
							offer.payment_method ===
							'Płatność za kamienie milowe'
						)
							cost = offer.milestone_rate;

						return (
							<div key={offer.id} className={styles.card}>
								<h4>{offer.title}</h4>
								<p>{offer.description}</p>
								<strong>{cost}</strong>
								<ul>
									{offer.skills.map((skill) => (
										<li key={skill}>{skill}</li>
									))}
								</ul>

								<Link to={`/zlecenia/zlecenie/${offer.id}`}>
									Szczegóły
								</Link>
							</div>
						);
				  })
				: null}
		</div>
	);
};

export default Offers;
