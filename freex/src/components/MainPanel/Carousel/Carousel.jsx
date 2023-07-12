import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { toast } from 'react-hot-toast';
import styles from './Carousel.module.css';
import { nanoid } from 'nanoid';
import { UserCard } from '../../index';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

function Arrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				display: 'block',
				background: 'grey',
			}}
			onClick={onClick}
		/>
	);
}

const Carousel = () => {
	const [users, setUsers] = useState([]);
	const collectionRef = collection(db, 'users');

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		nextArrow: <Arrow />,
		prevArrow: <Arrow />,
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const querySnapshot = await getDocs(
					query(collectionRef, orderBy('opinions', 'desc'))
				);
				const data = querySnapshot.docs.map((doc) => doc.data());
				setUsers(data);
			} catch (error) {
				toast.error(
					'Pojawił się błąd. Spróbuj później. Error ' + error
				);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<div className={styles.wrapper}>
				<h3>Najbardziej polecani freelancerzy</h3>

				<div className={styles.list}>
					<Slider {...settings}>
						{users.map((user) => (
							<Link
								to={`/freelancerzy/${user.id}`}
								key={nanoid()}
							>
								<UserCard
									key={nanoid()}
									role={user.role}
									email={user.email}
									src={user.imgURL}
									name={user.userName}
									opinions={user.opinions}
									id={user.id}
								/>
							</Link>
						))}
					</Slider>
				</div>
			</div>
		</>
	);
};

export default Carousel;
