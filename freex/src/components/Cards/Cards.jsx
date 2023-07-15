import styles from './Cards.module.css';

const cardsData = [
	{
		id: 1,
		img: '/MainPanel/undraw_Add_post.png',
		title: 'Opublikuj ogłoszenie',
		text: 'Opisz szczegółowo swój projekt, by freelancer ocenił, czy będzie dla niego odpowiedni.',
	},
	{
		id: 2,
		img: '/MainPanel/undraw_Sharing_articles.png',
		title: 'Wybierz freelancera',
		text: 'Zweryfikuj profile freelancerów, którzy są chętni do współpracy przy Twoim projekcie i  dopracuj z nimi szczegóły warunków współpracy.',
	},
	{
		id: 3,
		img: '/MainPanel/undraw_Transfer_money.png',
		title: 'Zapłać bezpiecznie',
		text: 'Wpłać pierwsze pieniądze, by freelancer ropoczął pracę. Pamiętaj, że FreeX nie wypłaci środków freelancerowi dopóki nie zaakceptujesz płatności.',
	},
	{
		id: 4,
		img: '/MainPanel/undraw_Winners.png',
		title: 'Zaakceptuj projekt i ciesz się nim !',
		text: 'Zweryfikuj efekty pracy freelancera. i zgłoś uwagi lub zaakceptuj projekt i ciesz się efektami! .',
	},
];
const Cards = () => {
	return (
		<div className={styles.cardsContainer}>
			{cardsData.map((cardData) => (
				<div key={cardData.id} className={styles.cardWrapper}>
					<div className={styles.cardImg}>
						<img src={cardData.img} alt={cardData.title} />
					</div>
					<h3>
						{cardData.id}. {cardData.title}
					</h3>
					<p>{cardData.text}</p>
				</div>
			))}
		</div>
	);
};

export default Cards;
