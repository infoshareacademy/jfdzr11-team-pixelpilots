import styles from "./Rating.module.css";

const Rating = ({ rating, opinionsNumber, className }) => {
  return (
    <div className={`${styles.rating} ${className}`}>
      {rating < 0.5 && (
        <div className={styles.rating_stars}>
          <img
            className={styles.icon}
            src="../../../../UserProfile/rating_star_no.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
        </div>
      )}
      {rating >= 0.5 && rating < 1.5 && (
        <div className={styles.rating_stars}>
          <img
            className={styles.icon}
            src="../../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
        </div>
      )}
      {rating >= 1.5 && rating < 2.5 && (
        <div className={styles.rating_stars}>
          <img
            className={styles.icon}
            src="../../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
        </div>
      )}
      {rating >= 2.5 && rating < 3.5 && (
        <div className={styles.rating_stars}>
          <img
            className={styles.icon}
            src="../../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
        </div>
      )}
      {rating >= 3.5 && rating < 4.5 && (
        <div className={styles.rating_stars}>
          <img
            className={styles.icon}
            src="../../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star_no.svg"
          />
        </div>
      )}
      {rating >= 4.5 && (
        <div className={styles.rating_stars}>
          <img
            className={styles.icon}
            src="../../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star.svg"
          />
          <img
            className={styles.icon}
            src="../../../UserProfile/rating_star.svg"
          />
        </div>
      )}
      <span className={styles.rating_number}>{rating}</span>
      {opinionsNumber && (
        <span className={styles.opinions_number}>
          ({opinionsNumber} opinii)
        </span>
      )}
    </div>
  );
};

export default Rating;
