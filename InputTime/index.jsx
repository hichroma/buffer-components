import React, { PropTypes } from 'react';

// generate array of numbers (inclusive)
const genArray = (start, end) => [...Array(end + 1).keys()].slice(start);
const leftPadTimeUnit = timeUnit => (timeUnit < 10 ? `0${timeUnit}` : timeUnit);

/* eslint-disable react/prop-types */

const renderAmPm = ({ value, onChange, submitting }) =>
  <select
    value={value.hours < 12 ? 'am' : 'pm'}
    disabled={submitting}
    onChange={e => onChange({
      ...value,
      hours: e.target.value === 'am'
      ? value.hours - 12
      : value.hours + 12,
    })}
  >
    <option value="am">am</option>
    <option value="pm">pm</option>
  </select>;

/* eslint-enable react/prop-types */

const marginRight = {
  marginRight: '0.5rem',
};

const displayHour = (hour, select24Hours) => {
  if (select24Hours) {
    return hour;
  } else if (hour === 0) {
    return 12;
  }
  const modHour = hour % 12;
  return modHour === 0 ? 12 : modHour;
};

const InputTime = ({
  select24Hours,
  input: {
    value,
    onChange,
  },
  meta: {
    submitting,
  },
}) => {
  if (!value) {
    value = { hours: 0, minutes: 0 };
  }
  return (
    <div>
      <select
        style={marginRight}
        disabled={submitting}
        value={value.hours}
        onChange={e => onChange({ ...value, hours: parseInt(e.target.value, 10) })}
      >
        {genArray(
          select24Hours || value.hours < 12 ? 0 : 12,
          select24Hours || value.hours > 11 ? 23 : 11,
        ).map(hour =>
          <option
            key={hour}
            value={hour}
          >
            {leftPadTimeUnit(displayHour(hour, select24Hours))}
          </option>)
        }
      </select>
      <select
        style={!select24Hours ? marginRight : undefined}
        disabled={submitting}
        value={value.minutes}
        onChange={e => onChange({ ...value, minutes: parseInt(e.target.value, 10) })}
      >
        {genArray(0, 59).map(min =>
          <option key={min} value={min}>{leftPadTimeUnit(min)}</option>)}
      </select>
      { select24Hours ? null : renderAmPm({ value, onChange, submitting }) }
    </div>
  );
};

InputTime.propTypes = {
  select24Hours: PropTypes.bool,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.shape({
        hours: PropTypes.number.isRequired,
        minutes: PropTypes.number.isRequired,
      }),
      PropTypes.string,
    ]),
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    submitting: PropTypes.bool,
  }),
};

InputTime.defaultProps = {
  meta: {},
};

export default InputTime;