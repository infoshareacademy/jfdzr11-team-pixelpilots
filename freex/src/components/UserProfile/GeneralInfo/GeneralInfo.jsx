import ProfileCard from "../ProfileCard/ProfileCard";
import styles from "./GeneralInfo.module.css";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import Rating from "../../UI/Rating/Rating";
import HeartButton from "../../UI/HeartButton/HeartButton";
import useCurrentUserData from "../../Context/CurrentUserDataContext";
import { toast } from "react-hot-toast";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import useAuth from "../../Context/AuthContext";

const GeneralInfo = ({
  name,
  userId,
  role,
  imgURL,
  opinions,
  description,
  hourlyRate,
  joiningDate,
  isButton = false,
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

  const toggleFavorite = async (userId) => {
    const currentFavorites = currentUserData?.favorites
      ? currentUserData?.favorites
      : [];

    let updatedFavorites;
    let isFavorite;

    if (currentFavorites.includes(userId)) {
      updatedFavorites = currentFavorites.filter((item) => item !== userId);
      isFavorite = true;
    } else {
      updatedFavorites = [...currentFavorites, userId];
      isFavorite = false;
    }

    const userUpdate = { favorites: updatedFavorites };

    const docRef = doc(db, "users", currentUserId);
    const docSnap = await getDoc(docRef);
    try {
      if (docSnap.exists()) {
        await updateDoc(docRef, userUpdate);
        if (!isFavorite) {
          toast.success("Dodano freelancera do ulubionych");
        } else if (isFavorite) {
          toast.success("Usunięto freelancera z ulubionych");
        }
      } else {
        await setDoc(docRef, userUpdate);
        if (!isFavorite) {
          toast.success("Dodano freelancera do ulubionych");
        } else if (isFavorite) {
          toast.success("Usunięto freelancera z ulubionych");
        }
      }
    } catch (e) {
      toast.error("Wystąpił błąd. Error " + e);
      console.log(e);
    }
  };

  const isUserFavorite = (userId) => {
    if (currentUserData?.favorites?.includes(userId)) {
      return true;
    }
    return false;
  };

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
        <div className={styles.header_wrapper}>
          <h4 className={styles.user_name}>{name}</h4>
          {currentUserId === userId ? null : (
            <HeartButton
              isFavorite={isUserFavorite(userId)}
              onClick={() => toggleFavorite(userId)}
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
