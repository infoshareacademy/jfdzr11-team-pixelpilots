import styles from './Skill.module.css';

const Skill = ({
	id,
	value,
	type,
	name,
	onChange,
	htmlFor,
	children,
	defaultChecked,
}) => {
	return (
		<>
			<input
				defaultChecked={defaultChecked}
				className={styles.input}
				type={type}
				name={name}
				id={id}
				value={value}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor={htmlFor}>
				{children}
			</label>
		</>
	);
};

export default Skill;
