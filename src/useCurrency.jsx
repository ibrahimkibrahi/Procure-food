
const intl = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

export const priceConverter = (price) => {
  return intl.format(price);
}
export default function useCurrency(price) {
    return intl.format(price);
}


