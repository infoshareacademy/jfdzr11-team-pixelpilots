import { Fragment, useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import styles from './Offers.module.css';
import { Link } from 'react-router-dom';

const skills = [
	'Projektowanie graficzne',
	'UI / User Interface',
	'UX / User Experience',
	'UX research',
	'UX writing',
	'Tworzenie logo',
	'Responsywne projektowanie',
	'Tworzenie stron internetowych',
	'Aplikacja mobilna',
	'Aplikacja webowa',
	'Photoshop',
	'Figma',
	'Adobe XD',
];

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
		const q = searchTerm
			? query(
					offersCollectionRef,
					where('skills', 'array-contains', searchTerm)
			  )
			: offersCollectionRef;
		getDocs(q).then((querySnapshot) => setOffers(getOffers(querySnapshot)));
	};

	useEffect(() => {
		onSnapshot(offersCollectionRef, (querySnapshot) => {
			const offers = getOffers(querySnapshot);
			setOffers(offers);
		});
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
				{skills.map((skill) => (
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
				? offers.map((offer) => (
						<div key={offer.id} className={styles.card}>
							<h4>{offer.title}</h4>
							<p>{offer.description}</p>
							<strong>{offer.total_payment}</strong>
							<ul>
								{offer.skills.map((skill) => (
									<li key={skill}>{skill}</li>
								))}
							</ul>

							<Link to={`/zlecenia/zlecenie/${offer.id}`}>
								Szczegóły
							</Link>
						</div>
				  ))
				: null}
		</div>
	);
};

export default Offers;
