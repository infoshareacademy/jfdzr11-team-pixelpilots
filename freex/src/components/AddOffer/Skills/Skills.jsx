import styles from './skills.module.css';
import { nanoid } from 'nanoid';

const Skills = ({ skills, setSkills, chosenSkills, setChosenSkills }) => {
  const handleAdd = (e) => {
    setChosenSkills([...chosenSkills, e.target.innerText]);
    const unchosen = skills.filter((elem) => elem !== e.target.innerText);
    setSkills([...unchosen]);
  };

  const handleRemove = (e) => {
    setSkills([...skills, e.target.innerText]);
    const chosen = chosenSkills.filter((elem) => elem !== e.target.innerText);
    setChosenSkills(chosen);
  };

  return (
    <>
      <div className={styles.skills}>
        {skills.map((skill, idx) => (
          <button
            name="skill"
            type="button"
            onClick={handleAdd}
            className={styles.skill}
            key={idx}
          >
            {skill}
          </button>
        ))}
      </div>
      <div className={styles.chosen_skills}>
        {chosenSkills.map((skill) => (
          <button
            type="button"
            onClick={handleRemove}
            key={nanoid()}
            className={styles.skill}
          >
            {skill}
          </button>
        ))}
      </div>
    </>
  );
};
export default Skills;
