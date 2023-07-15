import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import useAuth from "../../Context/AuthContext";
import Loader from "../../UI/Loader/Loader";
import styles from "./FavoriteFreelancers.module.css";
import GeneralInfo from "../../UserProfile/GeneralInfo/GeneralInfo";
import useCurrentUserData from "../../Context/CurrentUserDataContext";
import ProfileCard from "../../UserProfile/ProfileCard/ProfileCard";

const FavoriteFreelancers = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const { currentUserData } = useCurrentUserData();
  const currentUserId = currentUser.uid;
  const collectionRef = collection(db, "users");

  const favoriteUsers = currentUserData?.favoriteUsers;

  useEffect(() => {
    getDocs(collectionRef)
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          return { ...doc.data() };
        })
      )
      .then((data) => {
        setUsersData(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error("Pojawił się błąd. Spróbuj później. Error " + e);
      });
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  return (
    <ul className={styles.list}>
      {favoriteUsers && favoriteUsers.length > 0 ? (
        usersData?.map((user) => {
          if (
            currentUserId === user.id ||
            !user.userName ||
            !favoriteUsers.includes(user.id)
          ) {
            return null;
          } else {
            return (
              <li key={uuid()} className={styles.list_item}>
                <GeneralInfo
                  userId={user.id}
                  name={user.userName}
                  role={user.role}
                  imgURL={user.imgURL}
                  opinions={user.opinions}
                  description={user.description}
                  hourlyRate={user.hourlyRate}
                  joiningDate={user.joiningDate}
                  isButton={true}
                ></GeneralInfo>
              </li>
            );
          }
        })
      ) : (
        <ProfileCard>
          <p>Nie dodałeś jeszcze żadnego freelancera do ulubionych</p>
        </ProfileCard>
      )}
    </ul>
  );
};

export default FavoriteFreelancers;
