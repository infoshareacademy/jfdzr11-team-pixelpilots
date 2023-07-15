import styles from './UserData.module.css';
import Rating from '../../UI/Rating/Rating';

const UserData = ({ date, role, email, name, src, opinions }) => {
	const opinionsNumber = Number(opinions?.length);
	const ratingSum = opinions?.reduce(
		(accumulator, currentObject) =>
			Number(accumulator) + Number(currentObject.rating),
		0
	);
	const averageRating = (ratingSum / opinionsNumber).toFixed(2);

	return (
		<div className={styles.userWrapper}>
			<strong>O kliencie</strong>
			<ul className={styles.personalData}>
				<li>
					<img src={src} alt={'zdjęcie profilowe'} />
				</li>
				<li>
					<strong>{name}</strong>
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
				<li>
					<span>Email: </span>
					<span>{email}</span>
				</li>
				<li>
					<span>Stanowisko: </span>
					<span>{role}</span>
				</li>
				<li>
					<span>Data dołączenia: </span>
					<span>{date}</span>
				</li>
			</ul>
		</div>
	);
};

export default UserData;
