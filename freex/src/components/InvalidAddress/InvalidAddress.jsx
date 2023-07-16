import styles from './InvalidAdress.module.css';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

const InvalidAddress = () => {
	const navigate = useNavigate();
	const [countdown, setCountdown] = useState(4);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (countdown === 0) {
			navigate('/');
		}
	}, [countdown]);

	return (
		<div className={styles.wrapper}>
			<img
				src="/InvalidAddress/Running-man-nobg.png
      "
				alt="running man"
				className={styles.image}
			/>
			<div className={styles.content}>
				<span>404</span>
				<p>
					Wystąpił problem? Nasz specjalista już biegnie aby się tym
					zająć.
				</p>
				<div>
					<small>
						Za chwilę nastąpi przekierowanie na stronę główną.
					</small>
					<strong>{countdown}</strong>
				</div>
			</div>
		</div>
	);
};

export default InvalidAddress;
