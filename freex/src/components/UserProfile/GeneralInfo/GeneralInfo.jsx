import ProfileCard from "../ProfileCard/ProfileCard";
import styles from "./GeneralInfo.module.css";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import Rating from "../../UI/Rating/Rating";
import HeartButton from "../../UI/HeartButton/HeartButton";
import useCurrentUserData from "../../Context/CurrentUserDataContext";
import useAuth from "../../Context/AuthContext";
import { toggleFavoriteUser } from "../../../utils/toggleFavorite";
import { isUserFavorite } from "../../../utils/toggleFavorite";
import Portfolio from "../Portfolio/Portfolio";

const GeneralInfo = ({
  name,
  userId,
  role,
  imgURL,
  opinions,
  description,
  hourlyRate,
  joiningDate,
  portfolioLinks,
  isButton = false,
  isPortfolio = false,
}) => {
  const navigate = useNavigate();
  const { currentUserData } = useCurrentUserData();
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;

  const opinionsNumber = Number(opinions?.length);
  const ratingSum = opinions?.reduce(
    (accumulator, currentObject) =>
      Number(accumulator) + Number(currentObject.rating),
    0
  );
  const averageRating = (ratingSum / opinionsNumber).toFixed(2);

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
        <div className={styles.info_wrapper_right}>
          <div className={styles.header_wrapper}>
            <h4 className={styles.user_name}>{name}</h4>
            {currentUserId === userId ? null : (
              <HeartButton
                isFavorite={isUserFavorite(userId, currentUserData)}
                onClick={() =>
                  toggleFavoriteUser(userId, currentUserId, currentUserData)
                }
              />
            )}
          </div>
          <h5 className={styles.user_role}>{role}</h5>
          <Rating
            className={styles.rating}
            rating={
              averageRating && !isNaN(averageRating) ? averageRating : "0.00"
            }
            opinionsNumber={opinionsNumber ? opinionsNumber : "0"}
          />
          <p className={styles.description}>{description}</p>
          {isPortfolio && portfolioLinks && portfolioLinks.length > 0 && (
            <Portfolio portfolioLinks={portfolioLinks} />
          )}
        </div>

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
