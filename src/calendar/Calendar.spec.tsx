import React from 'react';
import { render } from '@testing-library/react';
import { Calendar } from './Calendar';
import * as dateFile from './Date';
import { generateRates } from './rates';
import * as utilsFile from './utils';

describe('Calendar', () => {
  function createUTCDate(year: number, zeroIndexMonth: number, day: number){
    return new Date(Date.UTC(year, zeroIndexMonth, day));
  }
  const defaultDate = createUTCDate(2022, 5, 6);

  beforeEach(function(){
    jest.restoreAllMocks();
  })

  it('renders 14 days when the first rate is on Monday', () => {
    jest.spyOn(dateFile, 'Date').mockImplementation(() => <div data-testid="day" />);
    const rates = generateRates(defaultDate);
    const {getAllByTestId} = render(<Calendar rates={rates} selectedDate={createUTCDate(2022, 5, 6)} />);
    expect(getAllByTestId('day')).toHaveLength(14);
  });

  [7, 8, 9, 10, 11,12].forEach(function(num){
    it(`renders 21 days when the first rate is NOT on Monday (June ${num}, 2022)`, () => {
      jest.spyOn(dateFile, 'Date').mockImplementation(() => <div data-testid="day" />);
      const dateString = createUTCDate(2022, 5, num);
      const rates = generateRates(new Date(dateString));
      const {getAllByTestId} = render(<Calendar rates={rates} selectedDate={createUTCDate(2022, 5, num)} />);
      expect(getAllByTestId('day')).toHaveLength(21);
    });
  });

  it('generates new dates when the rates change', () => {
    jest.spyOn(dateFile, 'Date').mockImplementation(() => <div data-testid="day" />);
    const getDatesFromRatesSpy = jest.spyOn(utilsFile, 'getDatesFromRates');
    const rates = generateRates(defaultDate);
    const rates2 = generateRates(createUTCDate(2022, 5, 8));
    const {rerender} = render(<Calendar rates={rates} selectedDate={defaultDate} />);
    rerender(<Calendar rates={rates2} selectedDate={defaultDate} />);
    expect(getDatesFromRatesSpy).toHaveBeenCalledTimes(2);
  });
  
  it('does not generate new dates when the rates stay the same', () => {
    jest.spyOn(dateFile, 'Date').mockImplementation(() => <div data-testid="day" />);
    const getDatesFromRatesSpy = jest.spyOn(utilsFile, 'getDatesFromRates');
    const rates = generateRates(defaultDate);
    const {rerender} = render(<Calendar rates={rates} selectedDate={defaultDate} />);
    rerender(<Calendar rates={rates} selectedDate={defaultDate} />);
    expect(getDatesFromRatesSpy).toHaveBeenCalledTimes(1);
  });

  it('shows the selectedDate as the rate selected initially', () => {
    // TODO
  });

  it('allows for user to click a date to show that date\'s rate', () => {
    // TODO
  });
});
