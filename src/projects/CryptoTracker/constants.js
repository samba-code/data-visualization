import { formatDate, formatHours } from "../../utils/utils";

export const DAY_VALUES = {
  DAY: {
    id: "DAY",
    day: 1,
    interval: "minutely",
    format: formatHours,
    ticks: 24,
  },
  WEEK: {
    id: "WEEK",
    day: 7,
    interval: "hourly",
    format: formatDate,
    ticks: 7,
  },
  MONTH: {
    id: "MONTH",
    day: 30,
    interval: "hourly",
    format: formatDate,
    ticks: 30,
  },
  YEAR: {
    id: "YEAR",
    day: 365,
    interval: "daily",
    format: formatDate,
    ticks: 12,
  },
};

const COINGECKO_URL = "https://api.coingecko.com/api/v3";

export const CURRENCY_URL = `${COINGECKO_URL}/simple/supported_vs_currencies`;

export const CURRENCIES = {
  "Pound Sterling": {
    name: "Pound Sterling",
    code: "GBP",
  },
  "US Dollar": {
    name: "US Dollar",
    code: "USD",
  },
  Euro: {
    name: "Euro",
    code: "EUR",
  },
  "Japanese Yen": {
    name: "Japanese Yen",
    code: "JPY",
  },
  "Australian Dollar": {
    name: "Australian Dollar",
    code: "AUD",
  },
  "Canadian Dollar": {
    name: "Canadian Dollar",
    code: "CAD",
  },
  "Swiss Franc": {
    name: "Swiss Franc",
    code: "CHF",
  },
  "Chinese Renminbi": {
    name: "Chinese Renminbi",
    code: "CNY",
  },
  "Hong Kong Dollar": {
    name: "Hong Kong Dollar",
    code: "HKD",
  },
  "New Zealand Dollar": {
    name: "New Zealand Dollar",
    code: "NZD",
  },
};

const CURRENCY_CODES = Object.values(CURRENCIES).map((x) => x.code);

export const DEFAULT_CURRENCY = CURRENCIES["Pound Sterling"];

export const makeDataURL = (time, currency = DEFAULT_CURRENCY.code) => {
  if (!DAY_VALUES[time]) {
    throw new Error(`Crypto data time value not valid: ${time}`);
  }
  if (!CURRENCY_CODES.includes(currency)) {
    throw new Error(`Currency is not a valid format: ${currency}`);
  }
  const { day, interval } = DAY_VALUES[time];
  return `${COINGECKO_URL}/coins/bitcoin/market_chart?vs_currency=${currency}&days=${day}&interval=${interval}`;
};
