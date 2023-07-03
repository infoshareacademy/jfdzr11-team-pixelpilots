import { useState } from "react";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import ProfileCard from "../ProfileCard/ProfileCard";
import styles from "./Opinions.module.css";
import { v4 as uuid } from "uuid";
import Rating from "../../UI/Rating/Rating";
import NewOpinion from "./NewOpinion/NewOpinion";

const Opinions = ({ className }) => {
  const [isAdding, setIsAdding] = useState(false);

  const opinions = [
    {
      title: "Audyt UX i przeprojektowanie strony",
      rating: 3.5,
      description:
        "Ewa zapewnia dobrą jakość pracy i bardzo dobry kontakt. Koszt jest trochę wyższy, ale Ewa rekompensuje to jakością. Dziękuję.",
      skills: ["Audyt UX", "Badania UX", "Badania UX"],
      author: "Janusz Przedsiębiorczy",
      dateAdded: "10.10.2022",
      imgUrl: "../../../../UserProfile/user_img.jpg",
    },
    {
      title: "Audyt UX i przeprojektowanie strony",
      rating: 5.0,
      description:
        "Ewa zapewnia dobrą jakość pracy i bardzo dobry kontakt. Koszt jest trochę wyższy, ale Ewa rekompensuje to jakością. Dziękuję. Ewa zapewnia dobrą jakość pracy i bardzo dobry kontakt. Koszt jest trochę wyższy, ale Ewa rekompensuje to jakością. Dziękuję.",
      skills: ["Audyt UX", "Badania UX", "Badania UX"],
      author: "Janusz Przedsiębiorczy",
      dateAdded: "10.10.2022",
      imgUrl: "../../../../UserProfile/user_img.jpg",
    },
  ];

  return (
    <ProfileCard className={className}>
      <h4 className={styles.heading}>Opinie</h4>
      <ul className={styles.list}>
        {opinions.map((item) => {
          return (
            <li key={uuid()} className={styles.list_item}>
              <Rating
                className={styles.rating}
                opinionsNumber={item.opinionsNumber}
                rating={item.rating}
              />
              <h5 className={styles.h5}>{item.title}</h5>
              <p className={styles.p}>{item.description}</p>
              <ul className={styles.skills}>
                {item.skills.map((item) => (
                  <li key={uuid()} className={styles.skill}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.author_info}>
                <img className={styles.userImg} src={item.imgUrl} />
                <span className={styles.caption}>{item.author}</span>
                <span className={styles.caption}>{item.dateAdded}</span>
              </div>
            </li>
          );
        })}
      </ul>
      {!isAdding ? (
        <PrimaryButton onClick={() => setIsAdding(true)}>
          Dodaj swoją opinię
        </PrimaryButton>
      ) : (
        <NewOpinion setVisibility={setIsAdding} />
      )}
    </ProfileCard>
  );
};

export default Opinions;
