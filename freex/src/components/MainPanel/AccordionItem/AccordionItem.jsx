import styles from './AccordionItem.module.css';
import { useState } from 'react';

const AccordionItem = ({ title, content, id }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className={styles.accordionItem} key={id}>
			<div
				onClick={() => setIsActive(!isActive)}
				className={styles.accordionTitle}
			>
				<span>{title}</span>
				<button className={styles.accordionBtn}>
					<img
						src="public/Accordion.png"
						style={{
							transform: isActive ? 'rotate(180deg)' : 'none',
						}}
					/>
				</button>
			</div>
			{isActive && <p className={styles.accordionContent}>{content}</p>}
		</div>
	);
};

export default AccordionItem;
