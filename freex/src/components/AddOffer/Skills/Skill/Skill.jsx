import styles from "./Skill.module.css";

const Skill = ({ skill, chooseSkill, chosenSkills }) => {
  const isActive = chosenSkills.includes(skill);

  return (
    <button
      name="skill"
      type="button"
      onClick={(e) => {
        chooseSkill(e);
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
