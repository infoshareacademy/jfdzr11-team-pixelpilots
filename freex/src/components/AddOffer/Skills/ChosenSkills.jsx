import { nanoid } from 'nanoid';

const ChosenSkills = ({
  chosenSkills,
  handleRemove,
  skillClassName,
  skillsClassName,
}) => {
  return (
    <div className={skillsClassName}>
      {chosenSkills.map((skill) => (
        <button
          type="button"
          onClick={handleRemove}
          key={nanoid()}
          className={skillClassName}
        >
          {skill}
        </button>
      ))}
    </div>
  );
};
export default ChosenSkills;
