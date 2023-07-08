import Accordion from './Accordion/Accordion';
import { Cards } from '../index';
import styles from './MainPanel.module.css';

const MainPanel = () => {
	return (
		<div className={styles.wrapper}>
			<Cards />
			<Accordion />
		</div>
	);
};

export default MainPanel;
