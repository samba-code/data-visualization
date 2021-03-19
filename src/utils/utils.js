import * as d3 from "d3";

// Used for testing loader
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (time) => {
  const formattedTime = d3.timeFormat("%e/%m/%Y");
  return formattedTime(time);
};

export const formatHours = (time) => {
  const formattedTime = d3.timeFormat("%H:%M %p");
  return formattedTime(time);
};
