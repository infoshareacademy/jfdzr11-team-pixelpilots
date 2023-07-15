import styles from '../OfferListItem/OfferListItem.module.css';

const Headers = () => {
  return (
    <div className={styles.headers}>
      <p className={styles.title}>nazwa</p>
      <p className={styles.publish_date}>data zamówienia</p>
      <p className={styles.end_date}>termin</p>
      <p className={styles.cost}>suma</p>
      <p className={styles.status}>status</p>
    </div>
  );
};
export default Headers;
