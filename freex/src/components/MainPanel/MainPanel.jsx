import { Accordion } from '../index';
import { Cards } from '../index';
import styles from './MainPanel.module.css';
import { Carousel } from '../index';

const MainPanel = () => {
	return (
		<div className={styles.wrapper}>
			<Cards />
			<Carousel />
			<Accordion />
		</div>
	);
};

export default MainPanel;
