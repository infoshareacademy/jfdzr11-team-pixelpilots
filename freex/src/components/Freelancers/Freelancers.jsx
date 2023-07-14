import { useEffect, useState } from "react";
import GeneralInfo from "../UserProfile/GeneralInfo/GeneralInfo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "./Freelancers.module.css";
import Loader from "../UI/Loader/Loader";
import { toast } from "react-hot-toast";
import useAuth from "../Context/AuthContext";
import { skills } from "../../utils/skills";
import ChipsFreelancerFilter from "../UI/ChipsFreelancerFilter/ChipsFreelancerFilter";

const Freelancers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skillFilters, setSkillFilters] = useState([]);
  const [sortingCategory, setSortingCategory] = useState("ratingUp");
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const collectionRef = collection(db, "users");

  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split(".");
    const dateObject = new Date(year, month - 1, day);
    return dateObject;
  };

  const sortUsers = (category, users) => {
    if (users) {
      const sortedUsers = [...users];
      if (category === "joiningDateUp") {
        sortedUsers.sort(
          (a, b) =>
            convertToDate(b.joiningDate).getTime() -
            convertToDate(a.joiningDate).getTime()
        );
      }
      if (category === "joiningDateDown") {
        sortedUsers.sort(
          (a, b) =>
            convertToDate(a.joiningDate).getTime() -
            convertToDate(b.joiningDate).getTime()
        );
      }
      if (category === "ratingDown") {
        sortedUsers.sort(
          (a, b) => getUserRating(a.opinions) - getUserRating(b.opinions)
        );
      }
      if (category === "ratingUp") {
        sortedUsers.sort(
          (a, b) => getUserRating(b.opinions) - getUserRating(a.opinions)
        );
      }
      return sortedUsers;
    }
  };

  const filterUsersData = (usersData) => {
    const filteredUsersData = usersData.filter(
      (userData) =>
        userData.userName &&
        userData.role &&
        userData.joiningDate &&
        userData.hourlyRate &&
        userData.description
    );
    return filteredUsersData;
  };

  useEffect(() => {
    getDocs(collectionRef)
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          return { ...doc.data() };
        })
      )
      .then((data) => {
        const filteredData = filterUsersData(data);
        const sortedData = sortUsers(sortingCategory, filteredData);
        setUsers(sortedData);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error("Pojawił się błąd. Spróbuj później. Error " + e);
      });
  }, []);

  const clearFilters = () => {
    setSkillFilters([]);
  };

  const toggleFilter = (item) => {
    if (skillFilters.includes(item)) {
      setSkillFilters((previousFilters) =>
        previousFilters.filter((filter) => filter !== item)
      );
      console.log(skillFilters);
    } else {
      setSkillFilters((previousFilters) => [...previousFilters, item]);
      console.log(skillFilters);
    }
  };

  const sortingCategories = [
    { id: "ratingUp", text: "ocena: od najwyższej" },
    { id: "ratingDown", text: "ocena: od najniższej" },
    { id: "joiningDateUp", text: "data dołączenia: od najnowszej" },
    { id: "joiningDateDown", text: "data dołączenia: od najstarszej" },
  ];

  const getUserRating = (opinions) => {
    const opinionsNumber = Number(opinions?.length);
    if (opinionsNumber === 0 || !opinions) {
      const averageRating = 0;
      return averageRating;
    } else {
      const ratingSum = opinions?.reduce(
        (accumulator, currentObject) =>
          Number(accumulator) + Number(currentObject.rating),
        0
      );
      const averageRating = ratingSum / opinionsNumber;
      return averageRating;
    }
  };

  const filterUsers = (users) => {
    if (!skillFilters) {
      return users;
    } else {
      return users?.filter((user) =>
        skillFilters.every((skillFilter) => user?.skills?.includes(skillFilter))
      );
    }
  };

  const filteredUsers = filterUsers(users);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Freelancerzy</h1>
      <div className={styles.chip_wrapper}>
        <ChipsFreelancerFilter className={styles.chip} onClick={clearFilters}>
          Wyświetl wszystkich
        </ChipsFreelancerFilter>
        {skills.map((item) => (
          <ChipsFreelancerFilter
            key={item}
            className={`${styles.chip} ${
              skillFilters.includes(item) && styles.active_chip
            }`}
            onClick={() => toggleFilter(item)}
          >
            {item}
          </ChipsFreelancerFilter>
        ))}
      </div>

      <div className={styles.sorter}>
        <span>Sortuj wg: </span>
        {sortingCategories.map((item) => (
          <button
            className={`${styles.sorter_item} ${
              item.id === sortingCategory && styles.sorter_item_active
            }`}
            key={item.id}
            onClick={() => {
              setSortingCategory(item.id);
              const sortedUsers = sortUsers(item.id, users);
              setUsers(sortedUsers);
            }}
          >
            {item.text}
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {filteredUsers.map((user) => {
          if (currentUserId === user.id || !user.userName) {
            return null;
          } else {
            return (
              <li key={user.id} className={styles.list_item}>
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
    </div>
  );
};

export default Freelancers;
