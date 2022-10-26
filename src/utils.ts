export function isEmpty(obj = {}) {
  return Object.keys(obj).length === 0;
}

export function formatNumberToUSD(cost: number) {
  const USD_CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return USD_CURRENCY_FORMATTER.format(cost);
}
