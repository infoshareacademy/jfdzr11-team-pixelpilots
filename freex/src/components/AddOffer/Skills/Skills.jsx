import { useEffect } from 'react';
import ChosenSkills from './ChosenSkills';
import styles from './skills.module.css';

const Skills = ({
  skills,
  setSkills,
  chosenSkills,
  setChosenSkills,
  defaultSkills,
}) => {
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

  useEffect(() => {
    if (!defaultSkills) {
      setChosenSkills(chosenSkills);
    } else {
      setChosenSkills(defaultSkills);
    }
  }, [defaultSkills]);

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

      <ChosenSkills
        chosenSkills={chosenSkills}
        handleRemove={handleRemove}
        skillClassName={styles.skill}
        skillsClassName={styles.chosen_skills}
      />
    </>
  );
};
export default Skills;
