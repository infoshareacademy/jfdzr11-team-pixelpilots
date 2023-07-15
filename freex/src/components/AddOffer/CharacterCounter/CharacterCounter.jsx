import styles from './CharcterCounter.module.css';

const CharacterCounter = ({ length, max }) => {
  return (
    <div className={styles.character_counter}>
      <p>Helper text</p>
      <p>
        {length}/{max}
      </p>
    </div>
  );
};
export default CharacterCounter;
