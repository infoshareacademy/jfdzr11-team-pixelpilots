import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-hot-toast';
import styles from './Offer.module.css';
import UserData from './UserData/UserData';
import Loader from '../UI/Loader/Loader';

const Offer = () => {
	const { zlecenieId } = useParams();

	const [offer, setOffer] = useState([]);
	const [user, setUser] = useState([]);
	const [userId, setUserId] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const getOffer = async () => {
		try {
			const docRef = doc(db, 'offers', zlecenieId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const offerData = docSnap.data();
				setOffer(offerData);
				setUserId(offerData.userId);
				setIsLoading(false);
			} else {
				toast.error('Nie ma takiego zlecenia');
				setIsLoading(false);
			}
		} catch (error) {
			toast.error('Nie udało się pobrać zlecenia');
		}
	};

	const getUser = async () => {
		try {
			const docRef = doc(db, 'users', userId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setUser(docSnap.data());
			} else {
				toast.error('Profil klienta nie został jeszcze uzupełniony');
			}
		} catch (error) {
			toast.error('Wystąpił błąd w pobraniu profilu klienta');
		}
	};

	useEffect(() => {
		getOffer();
	}, []);

	useEffect(() => {
		if (userId !== '') {
			getUser();
		}
	}, [userId]);

	let cost = '';
	if (offer.payment_method === 'Jednorazowa płatność') {
		cost = offer.total_payment;
	} else if (offer.payment_method === 'Płatność za godziny') {
		cost = offer.hourly_rate;
	} else if (offer.payment_method === 'Płatność za kamienie milowe')
		cost = offer.milestone_rate;

	if (isLoading) {
		return <Loader isLoading={isLoading} />;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.card}>
				<div className={styles.heading}>
					<div>
						<h4>{offer.title}</h4>
						<span>
							Data publikacji:{' '}
							<span>
								{offer.date?.toDate().toLocaleDateString()}
							</span>
						</span>
					</div>

					<div className={styles.priceWrapper}>
						<strong>{cost}</strong>
						<span>{offer.payment_method}</span>
					</div>
				</div>

				<ul className={styles.chips}>
					{offer.skills?.map((skill) => (
						<li key={skill}>{skill}</li>
					))}
				</ul>
				<p>{offer.description}</p>

				<div className={styles.number}>
					<span>Numer zlecenia: {offer?.offer_number}</span>
				</div>
			</div>
			<UserData
				date={user.joiningDate}
				role={user.role}
				email={user.email}
				src={user.imgURL}
				name={user.userName}
				opinions={user.opinions}
			/>
		</div>
	);
};

export default Offer;
