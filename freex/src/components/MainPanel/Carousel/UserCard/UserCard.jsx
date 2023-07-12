import Rating from '../../../UI/Rating/Rating';
import styles from './UserCard.module.css';

const UserCard = ({ role, email, name, src, opinions }) => {
	const opinionsNumber = Number(opinions?.length);
	const ratingSum = opinions?.reduce(
		(accumulator, currentObject) =>
			Number(accumulator) + Number(currentObject.rating),
		0
	);
	const averageRating = (ratingSum / opinionsNumber).toFixed(2);
	return (
		<ul className={styles.personalData}>
			<li>
				<img
					src={src}
					alt={'zdjęcie profilowe'}
					className={styles.image}
				/>
			</li>
			<li>
				<strong>{name}</strong>
			</li>
			<li>
				<span>{email}</span>
			</li>
			<li>
				<span>{role}</span>
			</li>
			<li>
				<Rating
					className={styles.rating}
					rating={
						averageRating && !isNaN(averageRating)
							? averageRating
							: '0.00'
					}
					opinionsNumber={opinionsNumber ? opinionsNumber : '0'}
				/>
			</li>
		</ul>
	);
};

export default UserCard;
