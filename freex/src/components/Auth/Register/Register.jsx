import styles from './Register.module.css';
import useAuth from '../../Context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { firebaseErrors } from '../../../utils/firebaseErrors';
import { PrimaryButton } from '../../index';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const Register = () => {
	const navigate = useNavigate();
	const { register } = useAuth();
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (formEvent) => {
		formEvent.preventDefault();

		const email = formEvent.target?.email.value.trim(' ');
		const password = formEvent.target?.password.value.trim(' ');
		const password_confirm =
			formEvent.target?.password_confirm.value.trim(' ');

		if (password !== password_confirm) {
			toast.error('Hasła nie są jednakowe');
		} else {
			try {
				await register(email, password);
				navigate('/');
				toast.success('Rejestracja zakończona sukcesem');
			} catch (error) {
				{
					firebaseErrors[error.code]
						? toast.error(firebaseErrors[error.code])
						: toast.error('Wystąpił błąd. Spróbuj później');
				}
			}
			formEvent.target.reset();
		}
	};

	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<h2>
					Cieszymy się, że to właśnie z nami chcesz rozwijać swój
					biznes
				</h2>
				<p>
					Jeszcze tylko kilka kroków i będziesz mógł w pełni korzystać
					z funkcjonalności FreeX. Uzupełnij podstawowe dane i znajdź
					specjalistów na miarę Twoich potrzeb.
				</p>
				<div className={styles.image}>
					<img
						src="/Register/register_hero.png"
						alt="register icon"
					/>
				</div>
			</div>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formWrapper}>
					<label htmlFor="email">Adres email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Wpisz adres e-mail..."
					/>
					<div className={styles.passwordField}>
						<input
							type={showPassword ? 'text' : 'password'}
							name="password"
							id="password"
							placeholder="Wpisz hasło..."
						/>
						<button
							type="button"
							className={styles.passwordToggle}
							onClick={handleTogglePasswordVisibility}
						>
							{showPassword ? <FaEye /> : <FaEyeSlash />}
						</button>
					</div>
					<div className={styles.passwordField}>
						<input
							type={showPassword ? 'text' : 'password'}
							name="password"
							id="password"
							placeholder="Potwierdź hasło..."
						/>
						<button
							type="button"
							className={styles.passwordToggle}
							onClick={handleTogglePasswordVisibility}
						>
							{showPassword ? <FaEye /> : <FaEyeSlash />}
						</button>
					</div>
					<PrimaryButton type="submit">Zarejestruj się</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default Register;
