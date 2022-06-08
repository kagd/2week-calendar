import React from 'react';
import { render } from '@testing-library/react';
import { Calendar } from './Calendar';
import * as dateFile from './Date';
import { generateRates } from './rates';
import * as utilsFile from './utils';

describe('Calendar', () => {
  const defaultDate = new Date('June 5, 2022');

  beforeEach(function(){
    jest.restoreAllMocks();
  })

  it('renders 14 days when the first rate is on Sunday', () => {
    jest.spyOn(dateFile, 'Date').mockImplementation(() => <div data-testid="day" />);
    const rates = generateRates(defaultDate);
    const {getAllByTestId} = render(<Calendar rates={rates} selectedDate={new Date('June 6, 2022')} />);
    expect(getAllByTestId('day')).toHaveLength(14);
  });

  [6, 7, 8, 9, 10, 11].forEach(function(num){
    it(`renders 21 days when the first rate is NOT on Sunday (June ${num}, 2022)`, () => {
      jest.spyOn(dateFile, 'Date').mockImplementation(() => <div data-testid="day" />);
      const dateString = `June ${num}, 2022`;
      const rates = generateRates(new Date(dateString));
      const {getAllByTestId} = render(<Calendar rates={rates} selectedDate={new Date(dateString)} />);
      expect(getAllByTestId('day')).toHaveLength(21);
    });
  });

  it('generates new dates when the rates change', () => {
    jest.spyOn(dateFile, 'Date').mockImplementation(() => <div data-testid="day" />);
    const getDatesFromRatesSpy = jest.spyOn(utilsFile, 'getDatesFromRates');
    const rates = generateRates(defaultDate);
    const rates2 = generateRates(new Date('June 6, 2022'));
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
