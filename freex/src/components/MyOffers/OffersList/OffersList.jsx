import OfferListItem from '../OfferListItem/OfferListItem';

const OffersList = ({ userOffers }) => {
  return (
    <>
      {userOffers.map((offer, idx) => {
        let cost = '';
        if (offer.payment_method === 'Jednorazowa płatność') {
          cost = offer.total_payment;
        } else if (offer.payment_method === 'Płatność za godziny') {
          cost = offer.hourly_rate;
        } else if (offer.payment_method === 'Płatność za kamienie milowe')
          cost = offer.milestone_rate;

        const date = offer.date.toDate();
        const dateFormat = `${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()}`;

        return (
          <OfferListItem
            key={idx}
            projectTitle={offer.title}
            publishDate={dateFormat}
            endDate="25.08.2023"
            cost={cost}
            status="Opublikowane"
          />
        );
      })}
    </>
  );
};

export default OffersList;
