import * as d3 from "d3";
import {
  DEFAULT_CURRENCY,
  DAY_VALUES,
  CURRENCY_CODES,
  COINGECKO_URL,
  DEFAULT_ASSET,
} from "./constants";

export const makeCurrencyFormat = (formatOptions) => (amount) => {
  const locale = d3.formatLocale(formatOptions);
  if (amount > 0) {
    return locale.format("$,")(amount);
  }
  return 0;
};

export const makeDataURL = (
  time,
  currency = DEFAULT_CURRENCY.code,
  asset = DEFAULT_ASSET
) => {
  if (!DAY_VALUES[time]) {
    throw new Error(`Crypto data time value not valid: ${time}`);
  }
  if (!CURRENCY_CODES.includes(currency)) {
    throw new Error(`Currency is not a valid format: ${currency}`);
  }
  const { day, interval } = DAY_VALUES[time];
  return `${COINGECKO_URL}/coins/${asset}/market_chart?vs_currency=${currency}&days=${day}&interval=${interval}`;
};
