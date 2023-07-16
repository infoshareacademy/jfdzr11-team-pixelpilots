import styles from './AddOffer.module.css';
import { updateSummary } from '../../../utils/updateSummary';
import { useState } from 'react';
import CharacterCounter from '../CharacterCounter/CharacterCounter';
import Skills from '../Skills/Skills';
import skillsData from '../Skills/skills.json';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import PremiumOption from '../PremiumOption/PremiumOption';
import Data from '../PremiumOption/PremiumOptionData.json';
import Summary from '../Summary/Summary';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton';

const OfferForm = ({
  offer,
  handleSubmit,
  chosenSkills,
  setChosenSkills,
  submitText,
}) => {
  const [titleLength, setTitleLength] = useState('0');
  const [summary, setSummary] = useState({});
  const [descriptionLength, setDescriptionLength] = useState('0');
  const [skills, setSkills] = useState(skillsData);
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const handleChange = (e, setLength) => {
    const length = e.target.value.length;
    setLength(length);
  };

  const attachFile = (e) => {
    toast.success('Dodano plik');
    setFile(e.target.files[0]);
  };

  return (
    <div className={styles.add_offer_wrapper}>
      <form
        onSubmit={handleSubmit}
        className={styles.add_offer_form}
        id="add_offer"
      >
        <h2 className={styles.title}>Wpisz tytuł projektu</h2>

        <input
          defaultValue={offer?.title}
          maxLength="100"
          onChange={(e) => {
            handleChange(e, setTitleLength);
            updateSummary(e, summary, setSummary);
          }}
          className={styles.project_title}
          placeholder="Wpisz tytuł który będzie najlepiej odzwierciedlał Twój projekt"
          name="title"
          type="text"
          required
        />

        <CharacterCounter length={titleLength} max="100" />

        <h2 className={styles.title}>Opisz swój projekt</h2>
        <textarea
          defaultValue={offer?.description}
          maxLength="600"
          onChange={(e) => {
            handleChange(e, setDescriptionLength);
            updateSummary(e, summary, setSummary);
          }}
          className={styles.description}
          placeholder="Opisz swój projekt tutaj"
          name="description"
          id="description"
          required
        ></textarea>

        <CharacterCounter length={descriptionLength} max="5000" />

        <div>
          <label className={styles.add_file} htmlFor="add_file">
            Upload file
          </label>
          <input
            onChange={attachFile}
            className={styles.add_file_input}
            id="add_file"
            name="add_file"
            type="file"
          />
        </div>
        <div>{file?.name}</div>
        <h2 className={styles.title}>Jakie umiejętności są potrzebne?</h2>

        <Skills
          chosenSkills={chosenSkills}
          setChosenSkills={setChosenSkills}
          skills={skills}
          setSkills={setSkills}
          defaultSkills={offer?.skills}
        />

        <PaymentMethod
          defaultPaymentMethod={offer?.payment_method}
          data={summary}
          setData={setSummary}
          defaultHourRate={offer?.hourly_rate}
          defaultMilestoneRate={offer?.milestone_rate}
          defaultTotalPayment={offer?.total_payment}
        />

        <div className={styles.premium_plan_section}>
          {Data.map((option, idx) => {
            let defaultValue = offer?.premium_plan?.[option.plan_name];
            return (
              <PremiumOption
                key={idx}
                plan_name={option.plan_name}
                plan_title={option.plan_title}
                plan_description={option.plan_description}
                img={option.img}
                defaultValue={defaultValue}
              />
            );
          })}
        </div>
        <h2 className={styles.title}>Podsumowanie</h2>

        <Summary
          title={summary.title}
          skills={chosenSkills}
          paymentMethod={summary.payment_method}
          description={summary.description}
        />
        <h2 className={styles.total}>Łącznie: {summary.payment} pln</h2>
        <div className={styles.submit_section}>
          <PrimaryButton onClick={() => navigate('/mojeoferty')}>
            Anuluj
          </PrimaryButton>
          <PrimaryButton type="submit">{submitText}</PrimaryButton>
        </div>
      </form>
    </div>
  );
};
export default OfferForm;
