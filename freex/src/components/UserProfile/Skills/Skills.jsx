import ProfileCard from "../ProfileCard/ProfileCard";
import styles from "./Skills.module.css";
import { v4 as uuid } from "uuid";

const Skills = ({ skills }) => {
  return (
    <ProfileCard className={styles.skills}>
      <h4 className={styles.heading}>Umiejętności</h4>
      <ul className={styles.skill_list}>
        {skills.map((item) => (
          <li className={styles.chip} key={uuid()}>
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.button_wrapper}></div>
    </ProfileCard>
  );
};

export default Skills;
