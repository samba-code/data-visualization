import React from "react";
import ReactDatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import PropTypes from "prop-types";
import "./DatePicker.css";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ years, months, selectedDate, onDateChange, filter }) => {
  console.log("years: ", years);
  return (
    <ReactDatePicker
      className="date-picker"
      dateFormat="dd/MM/yyyy"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={selectedDate}
      onChange={(date) => onDateChange(date)}
      filterDate={filter}
    />
  );
};

DatePicker.propTypes = {
  years: PropTypes.arrayOf(PropTypes.number),
  months: PropTypes.arrayOf(PropTypes.string),
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
  filter: PropTypes.func,
};

DatePicker.defaultProps = {
  years: [],
  months: [],
  selectedDate: "",
  onDateChange: (_) => _,
  filter: (_) => _,
};

export default DatePicker;
