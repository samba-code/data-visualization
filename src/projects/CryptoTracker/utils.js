import * as d3 from "d3";

const locale = d3.formatLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["£", ""],
  minus: "-",
  percent: "%",
});

export const currencyFormat = (x) => {
  if (x > 0) {
    return locale.format("$,")(x);
  }
  return 0;
};
