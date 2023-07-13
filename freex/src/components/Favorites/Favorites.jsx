import { useState } from "react";
import Chips from "../UI/Chips/Chips";
import FavoriteFreelancers from "./FavoriteFreelancers/FavoriteFreelancers";
import FavoriteOffers from "./FavoriteOffers/FavoriteOffers";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const [resource, setResource] = useState("freelancers");

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Ulubione</h1>
      <div className={styles.chip_wrapper}>
        <Chips onClick={() => setResource("freelancers")}>Freelancerzy</Chips>
        <Chips onClick={() => setResource("offers")}>Oferty</Chips>
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
