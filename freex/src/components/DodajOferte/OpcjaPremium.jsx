/* eslint-disable react/prop-types */
import styles from './OpcjaPremium.module.css';

const OpcjaPremium = ({ plan_name, plan_title, plan_description, img }) => {
  return (
    <div className={styles.premium_option}>
      <div>
        <input type="checkbox" id={plan_name} name={plan_name} />
        <label htmlFor={plan_name}>{plan_title}</label>
        <p>{plan_description}</p>
      </div>
      <img className={styles.image} src={img}></img>
    </div>
  );
};
export default OpcjaPremium;
