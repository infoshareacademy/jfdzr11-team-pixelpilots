import { useState } from "react";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import ProfileCard from "../ProfileCard/ProfileCard";
import styles from "./Opinions.module.css";
import { v4 as uuid } from "uuid";
import Rating from "../../UI/Rating/Rating";
import AddOpinion from "./AddOpinion/AddOpinion";
import SecondaryButton from "../../UI/SecondaryButton/SecondaryButton";
import useAuth from "../../Context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useParams } from "react-router-dom";

const Opinions = ({ className, currentUserData, setUser }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const opinions = currentUserData.opinions;
  const { userId } = useParams();
  const userProfileDocRef = doc(db, "users", userId);

  const isRemoveButtonVisible = (authorId) => {
    return authorId === currentUserId;
  };

  const onRemove = async (e, itemId) => {
    e.preventDefault();
    const filteredOpinions = opinions.filter((item) => item.id !== itemId);
    setUser({ ...currentUserData, opinions: filteredOpinions });
    await updateDoc(userProfileDocRef, { opinions: filteredOpinions });
  };

  return (
    <ProfileCard className={className}>
      <h4 className={styles.heading}>Opinie</h4>
      <ul className={styles.list}>
        {opinions?.map((item) => {
          return (
            <li key={item.id} className={styles.list_item}>
              <Rating
                className={styles.rating}
                opinionsNumber={item.opinionsNumber}
                rating={item.rating}
              />
              <h5 className={styles.h5}>{item.title}</h5>
              <p className={styles.p}>{item.description}</p>
              <ul className={styles.skills}>
                {item.skills.map((item) => (
                  <li key={uuid()} className={styles.skill}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.author_info}>
                <img className={styles.userImg} src={item.imgUrl} />
                <span className={styles.caption}>{item.author}</span>
                <span className={styles.caption}>{item.dateAdded}</span>
              </div>
              {isRemoveButtonVisible(item.authorId) && (
                <SecondaryButton
                  type="button"
                  className={styles.secondary_button}
                  onClick={(e) => onRemove(e, item.id)}
                >
                  Usuń opinię
                </SecondaryButton>
              )}
            </li>
          );
        })}
      </ul>
      {currentUserId !== userId &&
        (!isAdding ? (
          <PrimaryButton
            className={styles.button}
            onClick={() => setIsAdding(true)}
          >
            Dodaj swoją opinię
          </PrimaryButton>
        ) : (
          <AddOpinion setVisibility={setIsAdding} />
        ))}
    </ProfileCard>
  );
};

export default Opinions;
