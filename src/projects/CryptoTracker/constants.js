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

export const CURRENCIES = {
  "Pound Sterling": {
    name: "Pound Sterling",
    code: "GBP",
    format: {
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["£", ""],
      minus: "-",
      percent: "%",
    },
  },
  "US Dollar": {
    name: "US Dollar",
    code: "USD",
    format: {
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["$", ""],
      minus: "-",
      percent: "%",
    },
  },
  Euro: {
    name: "Euro",
    code: "EUR",
    format: {
      decimal: ",",
      thousands: ".",
      grouping: [3],
      currency: ["", "€"],
      minus: "-",
      percent: "%",
    },
  },
  "Japanese Yen": {
    name: "Japanese Yen",
    code: "JPY",
    format: {
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["¥ ", ""],
      minus: "-",
      percent: "%",
    },
  },
  "Australian Dollar": {
    name: "Australian Dollar",
    code: "AUD",
    format: {
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["$", ""],
      minus: "-",
      percent: "%",
    },
  },
  "Canadian Dollar": {
    name: "Canadian Dollar",
    code: "CAD",
    format: {
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["$ ", ""],
      minus: "-",
      percent: "%",
    },
  },
  "Swiss Franc": {
    name: "Swiss Franc",
    code: "CHF",
    format: {
      decimal: ",",
      thousands: ".",
      grouping: [3],
      currency: ["fr. ", ""],
      minus: "-",
      percent: "%",
    },
  },
  "Chinese Renminbi": {
    name: "Chinese Renminbi",
    code: "CNY",
    format: {
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["¥ ", ""],
      minus: "-",
      percent: "%",
    },
  },
  "Hong Kong Dollar": {
    name: "Hong Kong Dollar",
    code: "HKD",
    format: {
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["HK$ ", ""],
      minus: "-",
      percent: "%",
    },
  },
  "New Zealand Dollar": {
    name: "New Zealand Dollar",
    code: "NZD",
    format: {
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["$", ""],
      minus: "-",
      percent: "%",
    },
  },
};

export const COINGECKO_URL = "https://api.coingecko.com/api/v3";

export const CURRENCY_CODES = Object.values(CURRENCIES).map((x) => x.code);

export const DEFAULT_CURRENCY = CURRENCIES["Pound Sterling"];

export const DEFAULT_ASSET = "bitcoin";

export const COINS_LIST_URL = `${COINGECKO_URL}/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
