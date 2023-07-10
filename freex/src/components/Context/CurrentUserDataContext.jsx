import React, { useContext, useState, useEffect } from "react";
import useAuth from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-hot-toast";

const CurrentUserDataContext = React.createContext();

const useCurrentUserData = () => {
  return useContext(CurrentUserDataContext);
};

// eslint-disable-next-line react/prop-types
export const CurrentUserDataProvider = ({ children }) => {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      const docRef = doc(db, "users", currentUserId);
      try {
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setCurrentUserData(userData);
          } else {
            toast.error("Wystąpił problem z załadowaniem danych użytkownika");
          }
          setIsLoading(false);
        });

        return () => unsubscribe();
      } catch (e) {
        toast.error("Pojawił się błąd. Spróbuj później. Error: " + e);
      }
    }
  }, [currentUser, currentUserId]);

  const value = {
    currentUserData,
    isLoading,
  };

  return (
    <CurrentUserDataContext.Provider value={value}>
      {children}
    </CurrentUserDataContext.Provider>
  );
};

export default useCurrentUserData;
