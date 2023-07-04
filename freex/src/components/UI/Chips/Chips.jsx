import styles from './Chips.module.css';

const Chips = ({ children, type, onClick, className }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`${styles.button} ${className}`}
		>
			{children}
		</button>
	);
};

export default Chips;
