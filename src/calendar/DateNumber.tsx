import React from 'react';

interface DateNumberProps {
  dayOfMonth: number;
  monthName: string;
  fullDate: string;
}

export function DateNumber(props: DateNumberProps) {
  const month = props.dayOfMonth === 1 ? <em className='month-name'>{props.monthName}</em> : null;
  return (
    <span title={props.fullDate} className="day-of-month">
      {props.dayOfMonth} {month}
    </span>
  );
};