import { useState } from "react";
import Chips from "../UI/Chips/Chips";
import FavoriteFreelancers from "./FavoriteFreelancers/FavoriteFreelancers";
import FavoriteOffers from "./FavoriteOffers/FavoriteOffers";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const [visibility, setVisibility] = useState("freelancers");

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Ulubione</h1>
      <div className={styles.chip_wrapper}>
        <Chips onClick={() => setVisibility("freelancers")}>Freelancerzy</Chips>
        <Chips onClick={() => setVisibility("offers")}>Oferty</Chips>
      </div>
      <div className={styles.list_wrapper}>
        {visibility === "freelancers" ? (
          <FavoriteFreelancers />
        ) : (
          <FavoriteOffers />
        )}
      </div>
    </div>
  );
};

export default Favorites;
