export const DAY_VALUES = {
  DAY: {
    id: "DAY",
    day: 1,
    interval: "minutely",
  },
  WEEK: {
    id: "WEEK",
    day: 7,
    interval: "hourly",
  },
  MONTH: {
    id: "MONTH",
    day: 30,
    interval: "hourly",
  },
  YEAR: {
    id: "YEAR",
    day: 365,
    interval: "daily",
  },
};

export const makeDataURL = (time, currency = "gbp") => {
  if (!DAY_VALUES[time]) {
    throw new Error("Crypto data time value not valid.");
  }
  const { day, interval } = DAY_VALUES[time];
  return `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${day}&interval=${interval}`;
};
