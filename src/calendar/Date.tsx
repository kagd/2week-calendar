import React from 'react';
import { DateNumber } from './DateNumber';

interface DateProps {
  dayOfMonth: number;
  monthName: string;
  rate?: Rate;
  fullDate: string;
  isInitialSelectedDate: boolean;
  isHightlighted: boolean;
  onDateSelect: (rate: Rate) => void;
}

export function Date(props: DateProps) {
  const klasses = [];

  if(!props.rate){
    klasses.push('unavailable-date');
  }

  if(props.isInitialSelectedDate) {
    klasses.push('initial-selected-date')
  }

  if(props.isHightlighted){
    klasses.push('highlight-date')
  }

  const attributes: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> = {
    className: klasses.join(' '),
    onClick: props.rate ? (() => props.onDateSelect(props.rate as Rate)) : undefined,
  }

  return (
    <li {...attributes }>
      <DateNumber dayOfMonth={props.dayOfMonth} monthName={props.monthName} fullDate={props.fullDate} />
      <span className="rate">{props.rate ? `$${props.rate.totalCharge}` : '-'}</span>
    </li>
  );
};