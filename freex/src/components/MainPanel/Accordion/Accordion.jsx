import { accordionData } from '../../../utils/accordionData';
import AccordionItem from '../AccordionItem/AccordionItem';
import styles from './Accordion.module.css';

const Accordion = () => {
	return (
		<div className={styles.accordionWrapper}>
			<h3 className={styles.heading}>
				Najczęściej zadawane pytania i odpowiedzi
			</h3>
			<div>
				{accordionData.map(({ title, content, id }) => (
					<AccordionItem title={title} content={content} key={id} />
				))}
			</div>
		</div>
	);
};

export default Accordion;
