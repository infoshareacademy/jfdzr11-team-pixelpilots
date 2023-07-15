/* eslint-disable react/prop-types */
import styles from './PremiumOption.module.css';
import { useEffect, useState } from 'react';

const PremiumOption = ({
  plan_name,
  plan_title,
  plan_description,
  img,
  defaultValue,
}) => {
  const [isChecked, setIsChecked] = useState();

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    setIsChecked(defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.premium_option}>
      <div>
        <input
          type="checkbox"
          checked={isChecked}
          id={plan_name}
          name={plan_name}
          onChange={handleChange}
        />
        <label htmlFor={plan_name}>{plan_title}</label>
        <p className={styles.description}>{plan_description}</p>
      </div>
      <img className={styles.image} src={img}></img>
    </div>
  );
};
export default PremiumOption;
