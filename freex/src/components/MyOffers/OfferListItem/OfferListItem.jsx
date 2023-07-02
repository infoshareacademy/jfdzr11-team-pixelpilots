import styles from './OfferListItem.module.css';

const OferListItem = ({ projectTitle, publishDate, endDate, cost, status }) => {
  return (
    <div className={styles.offer_list_item}>
      <p className={styles.title}>{projectTitle}</p>
      <p className={styles.publish_date}>{publishDate}</p>
      <p className={styles.end_date}>{endDate}</p>
      <p className={styles.cost}>{cost}</p>
      <p className={styles.status}>{status}</p>
    </div>
  );
};
export default OferListItem;
