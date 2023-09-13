export default function formatPriceAlt(price) {
  const numFor = Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return numFor.format(price);
}