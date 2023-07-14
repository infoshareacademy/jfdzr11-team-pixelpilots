import { useState } from 'react';
import styles from './Skill.module.css';

const Skill = ({ skill, chooseSkill }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      name="skill"
      type="button"
      onClick={(e) => {
        chooseSkill(e);
        setIsActive(!isActive);
      }}
      className={
        !isActive ? styles.skill : `${styles.skill} ${styles.chosen_skill}`
      }
    >
      {skill}
    </button>
  );
};
export default Skill;
