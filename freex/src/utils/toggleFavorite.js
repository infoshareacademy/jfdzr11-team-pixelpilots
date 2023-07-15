import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-hot-toast";

export const toggleFavoriteUser = async (
  userId,
  currentUserId,
  currentUserData
) => {
  const currentFavorites = currentUserData?.favoriteUsers
    ? currentUserData?.favoriteUsers
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

  const userUpdate = { favoriteUsers: updatedFavorites };

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

export const isUserFavorite = (userId, currentUserData) => {
  if (currentUserData?.favoriteUsers?.includes(userId)) {
    return true;
  }
  return false;
};

export const toggleFavoriteOffer = async (
  offerId,
  currentUserData,
  currentUserId
) => {
  const currentFavorites = currentUserData?.favoriteOffers
    ? currentUserData?.favoriteOffers
    : [];

  let updatedFavorites;
  let isFavorite;

  if (currentFavorites.includes(offerId)) {
    updatedFavorites = currentFavorites.filter((item) => item !== offerId);
    isFavorite = true;
  } else {
    updatedFavorites = [...currentFavorites, offerId];
    isFavorite = false;
  }

  const userUpdate = { favoriteOffers: updatedFavorites };

  const docRef = doc(db, "users", currentUserId);
  const docSnap = await getDoc(docRef);
  try {
    if (docSnap.exists()) {
      await updateDoc(docRef, userUpdate);
      if (!isFavorite) {
        toast.success("Dodano ofertę do ulubionych");
      } else if (isFavorite) {
        toast.success("Usunięto ofertę z ulubionych");
      }
    } else {
      await setDoc(docRef, userUpdate);
      if (!isFavorite) {
        toast.success("Dodano ofertę do ulubionych");
      } else if (isFavorite) {
        toast.success("Usunięto ofertę z ulubionych");
      }
    }
  } catch (e) {
    toast.error("Wystąpił błąd. Error " + e);
    console.log(e);
  }
};

export const isOfferFavorite = (offerId, currentUserData) => {
  if (currentUserData?.favoriteOffers?.includes(offerId)) {
    return true;
  }
  return false;
};
