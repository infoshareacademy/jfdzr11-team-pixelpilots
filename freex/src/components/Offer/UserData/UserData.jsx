import styles from './UserData.module.css';

const UserData = ({ date, role, email, name, src }) => {
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
