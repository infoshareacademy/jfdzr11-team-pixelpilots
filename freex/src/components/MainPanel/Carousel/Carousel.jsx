import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { toast } from 'react-hot-toast';
import styles from './Carousel.module.css';
import { nanoid } from 'nanoid';
import { UserCard } from '../../index';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';

const Carousel = () => {
	const [users, setUsers] = useState([]);
	const [sliderRef, setSliderRef] = useState(null);

	const collectionRef = collection(db, 'users');

	const settings = {
		dots: false,
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		speed: 500,
	};

	const calculateAverageRating = (opinions) => {
		const ratingsSum = opinions.reduce(
			(accumulator, currentObject) =>
				accumulator + Number(currentObject.rating),
			0
		);
		const averageRating = ratingsSum / opinions.length;
		return averageRating;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const querySnapshot = await getDocs(
					query(collectionRef, orderBy('opinions', 'desc'))
				);
				const data = querySnapshot.docs.map((doc) => doc.data());
				const sortedData = data.sort((a, b) => {
					const ratingA = calculateAverageRating(a.opinions);
					const ratingB = calculateAverageRating(b.opinions);
					return ratingB - ratingA;
				});
				setUsers(sortedData);
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
					<div className={styles.controls}>
						<button
							onClick={sliderRef?.slickPrev}
							className={styles.controlsPrev}
						>
							<CiCircleChevLeft />
						</button>
						<button
							onClick={sliderRef?.slickNext}
							className={styles.controlsNext}
						>
							<CiCircleChevRight />
						</button>
					</div>
					<Slider ref={setSliderRef} {...settings}>
						{users
							.filter((user) => user.opinions.length > 0)
							.map((user) => (
								<Link
									to={`/freelancerzy/${user.id}`}
									key={nanoid()}
									className={styles.link}
								>
									<UserCard
										key={nanoid()}
										role={user.role}
										email={user.email}
										src={user.imgURL}
										name={user.userName}
										opinions={user.opinions}
										id={user.id}
										rating={user.rating}
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
