const PerDescount = ({ price, Percentage }) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
  }).format(price - (Percentage / 100) * price);
};
export default PerDescount;
