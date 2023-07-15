import styles from "./FavoriteOffers.module.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import Loader from "../../UI/Loader/Loader";
import { Link } from "react-router-dom";
import HeartButton from "../../UI/HeartButton/HeartButton";
import {
  isOfferFavorite,
  toggleFavoriteOffer,
} from "../../../utils/toggleFavorite";
import { nanoid } from "nanoid";
import useCurrentUserData from "../../Context/CurrentUserDataContext";
import ProfileCard from "../../UserProfile/ProfileCard/ProfileCard";

const FavoriteOffers = () => {
  const [offersData, setOffersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUserData } = useCurrentUserData();
  const collectionRef = collection(db, "offers");

  const favoriteOffers = currentUserData?.favoriteOffers;

  useEffect(() => {
    getDocs(collectionRef)
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      )
      .then((data) => {
        setOffersData(data);
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
      {favoriteOffers && favoriteOffers.length > 0 ? (
        offersData?.map((offer) => {
          if (!favoriteOffers.includes(offer.id)) {
            return null;
          } else {
            let cost = "";
            if (offer.payment_method === "Jednorazowa płatność") {
              cost = offer.total_payment;
            } else if (offer.payment_method === "Płatność za godziny") {
              cost = offer.hourly_rate;
            } else if (offer.payment_method === "Płatność za kamienie milowe")
              cost = offer.milestone_rate;
            return (
              <li key={uuid()} className={styles.list_item}>
                <div key={offer.id} className={styles.card}>
                  <div className={styles.header_wrapper}>
                    <h4>{offer.title}</h4>
                    <div className={styles.cost_heart_wrapper}>
                      <strong className={styles.strong}>{cost}</strong>
                      <HeartButton
                        isFavorite={isOfferFavorite(offer.id, currentUserData)}
                        onClick={() =>
                          toggleFavoriteOffer(offer.id, currentUserData)
                        }
                      />
                    </div>
                  </div>
                  <p>{offer.description}</p>
                  <ul>
                    {offer.skills.map((skill) => (
                      <li key={nanoid()}>{skill}</li>
                    ))}
                  </ul>

                  <Link to={`/zlecenia/zlecenie/${offer.id}`}>Szczegóły</Link>
                </div>
              </li>
            );
          }
        })
      ) : (
        <ProfileCard>
          <p>Nie dodałeś jeszcze żadnej oferty do ulubionych</p>
        </ProfileCard>
      )}
    </ul>
  );
};

export default FavoriteOffers;
