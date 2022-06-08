import React from 'react';
import { getDatesFromRates } from './utils';
import {Date} from './Date';
import './calendar.css';

interface CalendarProps {
  selectedDate: Date;
  rates: Rate[];
}

export function Calendar(props: CalendarProps) {  
  const dates = React.useMemo(() => getDatesFromRates(props.rates), [props.rates]);
  const initialSelectedDate = dates.find((date) => {
    return props.selectedDate.getUTCDate() === date.fullDate.getUTCDate();
  });

  const [selectedRate, setSelectedRate] = React.useState<Rate>((initialSelectedDate as RateDate).rate as Rate);
  
  const dateComps = dates.map(function(date){
    const isSelectedDate = props.selectedDate.getUTCDate() === date.fullDate.getUTCDate();
    return <Date key={date.dayOfMonth} dayOfMonth={date.dayOfMonth} rate={date.rate} fullDate={date.fullDate.toLocaleDateString()} monthName={date.monthName} isInitialSelectedDate={isSelectedDate} onDateSelect={setSelectedRate} isHightlighted={!!selectedRate && date.rate === selectedRate} />
  });

  if(!selectedRate){
    return null;
  }

  return (
    <div className="calendar">
      <ol>{dateComps}</ol>
      <section className='selected-rate'>
        <strong>Selected Date: </strong>
        ${selectedRate.totalCharge} - {selectedRate.transit.minimumPickupDate.toUTCString()}
      </section>
    </div>
  )
};