import styles from './CharcterCounter.module.css';

const CharacterCounter = ({ length }) => {
  return (
    <div className={styles.character_counter}>
      <p>Helper text</p>
      <p>{length}/100</p>
    </div>
  );
};
export default CharacterCounter;
