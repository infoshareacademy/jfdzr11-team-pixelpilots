import styles from './Headers.module.css';

const Headers = () => {
  return (
    <div className={styles.headers}>
      <p>nazwa</p>
      <p>data zamówienia</p>
      <p>termin</p>
      <p>suma</p>
      <p>status</p>
    </div>
  );
};
export default Headers;
