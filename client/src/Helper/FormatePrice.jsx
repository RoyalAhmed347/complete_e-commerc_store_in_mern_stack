const FormatePrice = ({ price }) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
  }).format(price);
};
export default FormatePrice;
