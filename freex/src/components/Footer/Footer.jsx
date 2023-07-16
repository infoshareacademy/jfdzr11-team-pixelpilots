import styles from '../Footer/Footer.module.css';

const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.left}>
				<img className={styles.logo} src="/Navbar/freex_logo.png" />
				<div className={styles.adress}>
					<p>FreeX sp. z o.o. ul. XYZXYZXYZ 1/1, 00-000 XXXXXX</p>
					<p>NIP: 0000000; KRS:0000000</p>
					<p>FreeX © 2023 Wszelkie prawa zastrzeżone</p>
				</div>
				<div className={styles.icons}>
					<img src="/Footer/facebook_logo.png"></img>
					<img src="/Footer/twitter_logo.png"></img>
					<img src="/Footer/instagram_logo.png"></img>
					<img src="/Footer/linkedin_logo.png"></img>
				</div>
			</div>
			<div className={styles.right}>
				<p className={styles.autor}>Pixel-Pilots develop team:</p>
				<a href="https://github.com/aleksandra-roguszewska">
					Aleksandra Roguszewska
				</a>
				<a href="https://github.com/hanna-hajduszewska">
					Hanna Hajduszewska
				</a>
				<a href="https://github.com/kubameyza">Jakub Meyza</a>
				<a href="https://github.com/damsmigielski">Damian Śmigielski</a>
			</div>
		</div>
	);
};

export default Footer;
