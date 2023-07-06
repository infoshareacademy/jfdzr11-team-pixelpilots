import styles from './OfferListItem.module.css';
import { useNavigate } from 'react-router-dom';

const OferListItem = ({
  projectTitle,
  publishDate,
  endDate,
  cost,
  status,
  offerId,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/mojeoferty/${offerId}`)}
      className={styles.offer_list_item}
    >
      <p className={styles.title}>{projectTitle}</p>
      <p className={styles.publish_date}>{publishDate}</p>
      <p className={styles.end_date}>{endDate}</p>
      <p className={styles.cost}>{cost}</p>
      <p className={styles.status}>{status}</p>
    </div>
  );
};
export default OferListItem;
