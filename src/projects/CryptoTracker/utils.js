import * as d3 from "d3";

export const makeCurrencyFormat = (formatOptions) => (amount) => {
  const locale = d3.formatLocale(formatOptions);
  if (amount > 0) {
    return locale.format("$,")(amount);
  }
  return 0;
};
