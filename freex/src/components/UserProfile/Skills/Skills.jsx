import ProfileCard from "../ProfileCard/ProfileCard";
import styles from "./Skills.module.css";

const Skills = ({ skills }) => {
  return (
    <ProfileCard className={styles.skills}>
      <h4>Umiejętności</h4>
      <div className="underline"></div>
      <ul className={styles.skill_list}>
        {skills.map((item) => (
          <li className={styles.chip} key="toDoLater">
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.button_wrapper}>
        {/* <PrimaryButton>Edit</PrimaryButton> */}
      </div>
    </ProfileCard>
  );
};

export default Skills;
