import { useEffect, useState } from "react";
import GeneralInfo from "../UserProfile/GeneralInfo/GeneralInfo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { v4 as uuid } from "uuid";
import styles from "./Freelancers.module.css";
import Loader from "../UI/Loader/Loader";
import { toast } from "react-hot-toast";
import useAuth from "../Context/AuthContext";

const Freelancers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const collectionRef = collection(db, "users");

  useEffect(() => {
    getDocs(collectionRef)
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          return { ...doc.data() };
        })
      )
      .then((data) => {
        setUsers(data);
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
      {users.map((user) => {
        if (currentUserId === user.id || !user.userName) {
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
      })}
    </ul>
  );
};

export default Freelancers;
