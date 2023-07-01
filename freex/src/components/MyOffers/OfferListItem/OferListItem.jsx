import styles from './OferListItem.module.css';

const OferListItem = ({ projectTitle, date, endDate, cost, status }) => {
  return (
    <div>
      <div className={styles.headers}>
        <p>{projectTitle}</p>
        <p>{date}</p>
        <p>{endDate}</p>
        <p>{cost}</p>
        <p>{status}</p>
      </div>
    </div>
  );
};
export default OferListItem;
