import { useState } from "react";
import FavoriteFreelancers from "./FavoriteFreelancers/FavoriteFreelancers";
import FavoriteOffers from "./FavoriteOffers/FavoriteOffers";
import styles from "./Favorites.module.css";
import ChipsFilter from "../UI/ChipsFilter/ChipsFilter";

const Favorites = () => {
  const [resource, setResource] = useState("freelancers");

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Ulubione</h1>
      <div className={styles.chip_wrapper}>
        <ChipsFilter
          onClick={() => setResource("freelancers")}
          className={resource === "freelancers" && styles.active}
        >
          Freelancerzy
        </ChipsFilter>
        <ChipsFilter
          onClick={() => setResource("offers")}
          className={resource === "offers" && styles.active}
        >
          Oferty
        </ChipsFilter>
      </div>
      <div className={styles.list_wrapper}>
        {resource === "freelancers" ? (
          <FavoriteFreelancers />
        ) : (
          <FavoriteOffers />
        )}
      </div>
    </div>
  );
};

export default Favorites;
