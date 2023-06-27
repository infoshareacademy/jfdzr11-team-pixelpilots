import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import ProfileCard from "./ProfileCard/ProfileCard";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const user = {
    name: "Ewa Kosicka",
    imgUrl: "../../../UserProfile/user_img.png",
    role: "Projektant UX",
    rating: 4.9,
    opinionsNumber: 33,
    hourlyRate: "100",
    joiningDate: "25.06.2023",
    description:
      "Cześć, jestem Ewa, projektant UX/UI, który tworzy projekty, które inspirują i pozostawiają trwały ślad. Dzięki ponad 6-letniemu doświadczeniu zawodowemu w projektowaniu UX/UI doskonaliłam swoje umiejetności tworzenia urzekających i znaczących projektów. ",
    skills: [
      "Audyt UX",
      "Badania UX",
      "UX / User experience",
      "UI / User interface",
      "Figma",
      "Projektowanie stron interentowych",
      "Projektowanie aplikacji webowych",
      "Projektowanie aplikacji mobilnych",
      "UX writing",
      "Photoshop",
      "Adobe XD",
    ],
    opinions: [
      {
        title: "Audyt UX i przeprojektowanie strony",
        rating: 5.0,
        dexcription:
          "Ewa zapewnia dobrą jakość pracy i bardzo dobry kontakt. Koszt jest trochę wyższy, ale Ewa rekompensuje to jakością. Dziękuję.",
        skills: ["Audyt UX", "Badania UX", "Badania UX"],
        author: "Janusz Przedsiębiorczy",
        dateAdded: "10.10.2022",
      },
      {
        title: "Audyt UX i przeprojektowanie strony",
        rating: 5.0,
        dexcription:
          "Ewa zapewnia dobrą jakość pracy i bardzo dobry kontakt. Koszt jest trochę wyższy, ale Ewa rekompensuje to jakością. Dziękuję. Ewa zapewnia dobrą jakość pracy i bardzo dobry kontakt. Koszt jest trochę wyższy, ale Ewa rekompensuje to jakością. Dziękuję.",
        skills: ["Audyt UX", "Badania UX", "Badania UX"],
        author: "Janusz Przedsiębiorczy",
        dateAdded: "10.10.2022",
      },
    ],
    experience: [
      {
        logoURL: "../../../UserProfile/company_logo.png",
        role: "Senior UX/UI Specjalista",
        company: "Hrtec Sp. z o. o.",
        startingTime: "12.2022",
        endingTime: "07.2023",
      },
      {
        logoURL: "../../../UserProfile/company_logo.png",
        role: "Senior UX/UI Specjalista",
        company: "Hrtec Sp. z o. o.",
        startingTime: "12.2022",
        endingTime: "07.2023",
      },
    ],
    education: [
      {
        logoURL: "../../../UserProfile/education_logo.png",
        institution: "infoShare Academy",
        description: "Bootcamp UX Designer (240 h)",
        startingTime: "12.2022",
        endingTime: "07.2023",
      },
      {
        logoURL: "../../../UserProfile/education_logo.png",
        institution: "infoShare Academy",
        description: "Bootcamp UX Designer (240 h)",
        startingTime: "12.2022",
        endingTime: "07.2023",
      },
    ],
  };

  return (
    <div className={styles.user_profile}>
      <ProfileCard className={styles.general_info}>
        <div className={styles.general_info_left}>
          <img className={styles.user_img} src={user.imgUrl}></img>
          <div className={styles.elems_under_img}>
            <span className={styles.rate}>{user.hourlyRate} PLN/h</span>
            <div className={styles.underline}></div>
            <span className={styles.joiningDate}>
              Dołączył: {user.joiningDate}
            </span>
          </div>
        </div>
        <div className={styles.general_info_right}>
          <h4 className={styles.user_name}>{user.name}</h4>
          <h5 className={styles.user_role}>{user.role}</h5>
          <div className={styles.rating}>
            <div className={styles.rating_stars}>
              <img src="../../../UserProfile/rating_star.svg" />
              <img src="../../../UserProfile/rating_star.svg" />
              <img src="../../../UserProfile/rating_star.svg" />
              <img src="../../../UserProfile/rating_star.svg" />
              <img src="../../../UserProfile/rating_star_no.svg" />
            </div>
            <span className={styles.rating_number}>{user.rating}</span>
            <span>({user.opinionsNumber} opinii)</span>
          </div>
          <p className={styles.description}>{user.description}</p>
          <div className={styles.button_wrapper}>
            {/* <PrimaryButton>Edit</PrimaryButton> */}
          </div>
        </div>
      </ProfileCard>

      <div className={`${styles.skills} ${styles.card}`}>
        <h4>Umiejętności</h4>
        <div className="underline"></div>
        <ul className={styles.skill_list}>
          {user.skills.map((item) => (
            <li className={styles.chip} key="toDoLater">
              {item}
            </li>
          ))}
        </ul>
        <div className={styles.button_wrapper}>
          {/* <PrimaryButton>Edit</PrimaryButton> */}
        </div>
      </div>
      {/* <div className="opinions">opinions</div> -tego na razie nie robię - zbyt skomplikowane */}
      <div className={`${styles.experience} ${styles.card}`}>
        <h4 className={styles.experience_header}>Doświadczenie</h4>
        <ul>
          {user.experience.map((item) => (
            <li key="todolater" className={styles.experience_item}>
              <img className={styles.experience_logo} src={item.logoURL}></img>
              <div className={styles.experience_description}>
                <h5 className={styles.role}>{item.role}</h5>
                <p className={styles.companyName}>{item.company}</p>
                <p className={styles.timespan}>
                  {item.startingTime}-{item.endingTime}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.button_wrapper}>
          {/* <PrimaryButton>Edit</PrimaryButton> */}
        </div>
      </div>
      <div className={`${styles.education} ${styles.card}`}>
        <h4>Education</h4>
        <div className="underline"></div>
        <ul>
          {user.education.map((item) => (
            <li key="todolater">
              <img className={styles.education_logo} src={item.logoURL}></img>
              <h5>{item.institution}</h5>
              <span>{item.description}</span>
              <span>
                {item.startingTime}-{item.endingTime}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.button_wrapper}>
          {/* <PrimaryButton>Edit</PrimaryButton> */}
        </div>
      </div>

      <div className={`${styles.contact}`}>
        <h5 className={styles.contact_header}>
          Skontaktuj się z freelancerem w sprawie swojego projektu
        </h5>
        <PrimaryButton>Informacje kontaktowe</PrimaryButton>
      </div>
      {/* <div className={styles.look}>
        <button className={styles.look_button}>
          Przeglądaj innych freelancerów
        </button>
      </div> */}
    </div>
  );
};

export default UserProfile;
