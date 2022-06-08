declare type Rate = {
  totalCharge: number;
  transit: {
    minimumPickupDate: Date;
  }
}

declare type RateDate = {
  month: number;
  dayOfMonth: number;
  rate?: Rate;
  fullDate: Date;
  monthName: string;
}

declare type NewDate = {
  month: number;
  monthName: string;
  dayOfMonth: number;
  year: number;
  fullDate: Date;
}