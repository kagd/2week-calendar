import React from 'react';
import './App.css';
import {Calendar} from './calendar/Calendar';
import {generateRates} from './calendar/rates';

function App() {
  const ratesTwoWeeks = generateRates(new Date('June 26, 2022'));
  const ratesThreeWeeks = generateRates(new Date('June 27, 2022'));
  const ratesJanuary = generateRates(new Date('January 1, 2022'));
  const ratesDecember = generateRates(new Date('December 28, 2022'));
  const ratesLeapYear = generateRates(new Date('February 26, 2024'));
  return (
    <div className="App">
      <h2>2 weeks displayed - June 26, 2022</h2>
      <Calendar rates={ratesTwoWeeks} selectedDate={new Date('June 28, 2022')} />
      
      <h2>3 weeks displayed - June 27, 2022</h2>
      <Calendar rates={ratesThreeWeeks} selectedDate={new Date('June 28, 2022')} />
      
      <h2>Add previous month and year - January 1, 2022</h2>
      <Calendar rates={ratesJanuary} selectedDate={new Date('January 4, 2022')} />
      
      <h2>Add next month and year - December 2022</h2>
      <Calendar rates={ratesDecember} selectedDate={new Date('December 29, 2022')} />
      
      <h2>Leap Year - February 2024</h2>
      <Calendar rates={ratesLeapYear} selectedDate={new Date('March 10, 2024')} />
    </div>
  );
}

export default App;
