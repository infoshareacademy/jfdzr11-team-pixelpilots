export const updateSummary = (e, data, setData, payment = '0') => {
  setData({
    ...data,
    payment,
    [e.target.name]: e.target.value,
  });
};
