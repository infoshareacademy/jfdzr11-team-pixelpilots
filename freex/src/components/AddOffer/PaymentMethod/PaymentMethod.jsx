import { useState } from 'react';
import styles from './PaymentMethod.module.css';
import { updateSummary } from '../../../utils/updateSummary';

const PaymentMethod = ({ data, setData }) => {
  const [payment_method, setPaymentMethod] = useState('');

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
    updateSummary(e, data, setData);
  };

  return (
    <>
      <h2 className={styles.title}>Jak chcesz zapłacić?</h2>
      <div>
        <div className={styles.radio}>
          <input
            onChange={handleChange}
            value="Płatność za godziny"
            name="payment_method"
            id="h_rate"
            type="radio"
          />
          <label
            name="payment_method"
            value="Płatność za godziny"
            htmlFor="h_rate"
          >
            Płatność za godziny
          </label>
        </div>
        <div className={styles.radio}>
          <input
            onChange={handleChange}
            value="Płatność za kamienie milowe"
            name="payment_method"
            id="milestones"
            type="radio"
          />
          <label htmlFor="milestones">Płatność za kamienie milowe</label>
        </div>
        <div className={styles.radio}>
          <input
            onChange={handleChange}
            value="Jednorazowa płatność"
            name="payment_method"
            id="one_time_payment"
            type="radio"
          />
          <label htmlFor="one_time_payment">Jednorazowa płatność</label>
        </div>
      </div>
      <>
        <div className={styles.payment_method}>
          {payment_method === 'Płatność za godziny' ? (
            <>
              <p>Stawka godzinowa</p>

              <input
                key="1"
                className={styles.rate_input}
                placeholder="Podaj stawkę pln za godzinę"
                type="number"
                name={'hourly_rate'}
                onChange={(e) =>
                  updateSummary(e, data, setData, e.target.value)
                }
              />
            </>
          ) : payment_method === 'Płatność za kamienie milowe' ? (
            <>
              <p>Stawka za kamienie milowe</p>

              <input
                key="2"
                className={styles.rate_input}
                placeholder="Podaj stawkę pln za kamień milowy"
                type="number"
                name="milestone_rate"
                onChange={(e) =>
                  updateSummary(e, data, setData, e.target.value)
                }
              />
            </>
          ) : payment_method === 'Jednorazowa płatność' ? (
            <>
              <p>Jednorazowa płatność</p>

              <input
                key="3"
                className={styles.rate_input}
                placeholder="Podaj stawkę pln za całość"
                type="number"
                name="total_payment"
                onChange={(e) =>
                  updateSummary(e, data, setData, e.target.value)
                }
              />
            </>
          ) : null}
        </div>
      </>
    </>
  );
};
export default PaymentMethod;
