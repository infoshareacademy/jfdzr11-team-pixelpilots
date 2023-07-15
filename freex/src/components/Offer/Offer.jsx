import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-hot-toast';
import styles from './Offer.module.css';
import UserData from './UserData/UserData';
import Loader from '../UI/Loader/Loader';
import PrimaryButton from '../UI/PrimaryButton/PrimaryButton';
import useAuth from '../Context/AuthContext';

const Offer = () => {
	const { zlecenieId } = useParams();
	const [offer, setOffer] = useState([]);
	const [user, setUser] = useState([]);
	const [userId, setUserId] = useState('');
	const [apply, setApply] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const docRef = doc(db, 'offers', zlecenieId);
	const { currentUser } = useAuth();

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
			}
		} catch (error) {
			toast.error('Nie udało się pobrać zlecenia');
		}
	};

	const getUser = async () => {
		try {
			const docRef = doc(db, 'users', userId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) setUser(docSnap.data());
		} catch (error) {
			toast.error('Wystąpił błąd w pobraniu profilu klienta');
		}
	};

	useEffect(() => {
		getOffer();
		offer.applying?.includes(currentUser.uid) ? setApply(true) : null;
	}, [offer]);

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

	const handleApply = async () => {
		try {
			await updateDoc(docRef, {
				applying: offer.applying
					? [...offer.applying, currentUser.uid]
					: [currentUser.uid],
			});
			toast.success('Złożono aplikację na tę ofertę');
		} catch (error) {
			toast.error('Wystąpił błąd podczas aplikowania na tę ofertę');
		}
		setApply(true);
	};

	const handleStopApplying = async () => {
		const filtered = offer?.applying?.filter(
			(applying) => applying !== currentUser.uid
		);
		try {
			await setDoc(docRef, { applying: filtered }, { merge: true });
			toast.success('Przestałeś aplikować na tę ofertę');
		} catch (error) {
			toast.error('Wystąpił błąd usuwania aplikacji');
		}
		setApply(!apply);
	};

	if (isLoading) {
		return <Loader isLoading={isLoading} />;
	}

	const anonymousUser = {
		userName: 'Anonimowy Użytkownik',
		email: 'anonimowy@example.com',
		imgURL: '/public/user.png',
		role: 'Użytkownik',
		joiningDate: 'Brak danych',
		opinions: [],
	};

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

					{!apply && currentUser.uid !== offer.userId ? (
						<div className={styles.apply_wrapper}>
							<PrimaryButton
								onClick={handleApply}
								className={styles.apply_button}
							>
								Aplikuj
							</PrimaryButton>
						</div>
					) : currentUser.uid === offer.userId ? null : (
						<>
							<div className={styles.apply_wrapper}>
								<p className={styles.apply_info}>
									Aplikujesz na tę ofertę
								</p>
								<PrimaryButton
									onClick={handleStopApplying}
									className={styles.apply_button}
								>
									Wycofaj aplikację
								</PrimaryButton>
							</div>
						</>
					)}
				</div>
			</div>

			{user && Object.keys(user).length > 0 ? (
				<UserData
					date={user.joiningDate}
					role={user.role}
					email={user.email}
					src={user.imgURL}
					name={user.userName}
					opinions={user.opinions}
				/>
			) : (
				<UserData
					date={anonymousUser.joiningDate}
					role={anonymousUser.role}
					email={anonymousUser.email}
					src={anonymousUser.imgURL}
					name={anonymousUser.userName}
					opinions={anonymousUser.opinions}
				/>
			)}
		</div>
	);
};

export default Offer;
