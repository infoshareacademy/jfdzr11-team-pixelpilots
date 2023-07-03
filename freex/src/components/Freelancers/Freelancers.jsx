import { useEffect, useState } from "react";
import GeneralInfo from "../UserProfile/GeneralInfo/GeneralInfo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { v4 as uuid } from "uuid";
import styles from "./Freelancers.module.css";

const Freelancers = () => {
  const [users, setUsers] = useState([]);
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
      });
  }, []);

  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <li key={uuid()} className={styles.list_item}>
          <GeneralInfo
            userId={user.id}
            name={user.userName}
            role={user.role}
            imgURL={user.imgURL}
            rating={user.rating}
            opinionsNumber={user.opinionsNumber}
            description={user.description}
            hourlyRate={user.hourlyRate}
            joiningDate={user.joiningDate}
            isButton={true}
          ></GeneralInfo>
        </li>
      ))}
    </ul>
  );
};

export default Freelancers;
