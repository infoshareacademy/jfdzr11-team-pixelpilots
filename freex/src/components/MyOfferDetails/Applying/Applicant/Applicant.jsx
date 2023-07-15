import styles from './Applicant.module.css';
import { useNavigate } from 'react-router-dom';

const Applicant = ({ applicant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/freelancerzy/${applicant.id}`);
    console.log(applicant.id);
  };

  return (
    <div onClick={handleClick} className={styles.applicant}>
      <img
        className={styles.applicant_picture}
        src={applicant.imgURL}
        alt="user profile picture"
      />
      <div className={styles.info}>
        <p className={styles.name}>{applicant.userName}</p>
        <p className={styles.description}>{applicant.description}</p>
      </div>
      <div className={styles.rate}>{applicant.hourlyRate} PLN / godz.</div>
    </div>
  );
};
export default Applicant;
