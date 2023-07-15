import { useEffect } from "react";
import styles from "./skills.module.css";
import Skill from "./Skill/Skill.jsx";
import { v4 as uuid } from "uuid";

const Skills = ({ skills, chosenSkills, setChosenSkills, defaultSkills }) => {
  const chooseSkill = (e) => {
    if (!chosenSkills.includes(e.target.innerText)) {
      setChosenSkills([...chosenSkills, e.target.innerText]);
    } else {
      const chosen = chosenSkills.filter((elem) => elem !== e.target.innerText);
      setChosenSkills(chosen);
    }
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
          <Skill
            key={idx}
            skill={skill}
            chooseSkill={chooseSkill}
            chosenSkills={chosenSkills}
          />
        ))}
      </div>
    </>
  );
};
export default Skills;
