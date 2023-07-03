import ProfileCard from "../ProfileCard/ProfileCard";
import styles from "./GeneralInfo.module.css";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";

const GeneralInfo = ({
  name,
  userId,
  role,
  imgURL,
  rating,
  opinionsNumber,
  description,
  hourlyRate,
  joiningDate,
  isButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <ProfileCard className={styles.general_info}>
      <div className={styles.general_info_left}>
        <img className={styles.user_img} src={imgURL}></img>
        <div className={styles.elems_under_img}>
          <span className={styles.rate}>{hourlyRate} PLN/h</span>
          <div className={styles.underline}></div>
          <span className={styles.joiningDate}>Dołączył: {joiningDate}</span>
        </div>
      </div>
      <div className={styles.general_info_right}>
        <h4 className={styles.user_name}>{name}</h4>
        <h5 className={styles.user_role}>{role}</h5>
        <div className={styles.rating}>
          <div className={styles.rating_stars}>
            <img src="../../../../UserProfile/rating_star_no.svg" />
            <img src="../../../UserProfile/rating_star_no.svg" />
            <img src="../../../UserProfile/rating_star_no.svg" />
            <img src="../../../UserProfile/rating_star_no.svg" />
            <img src="../../../UserProfile/rating_star_no.svg" />
          </div>
          <span className={styles.rating_number}>{rating}</span>
          <span>({opinionsNumber} opinii)</span>
        </div>
        <p className={styles.description}>{description}</p>
        {isButton ? (
          <div className={styles.button_wrapper}>
            <PrimaryButton
              className={styles.button}
              onClick={() => {
                navigate(`/freelancerzy/${userId}`);
              }}
            >
              Szczegóły
            </PrimaryButton>
          </div>
        ) : null}
      </div>
    </ProfileCard>
  );
};

export default GeneralInfo;
