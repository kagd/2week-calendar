import {addDays} from './utils';

const base = {
  "customer": {
    "customerCode": "C8335637"
  },
  "distanceDetail": {
    "distance": 912.0,
    "distanceUnitCode": "Miles"
  },
  "quoteId": 2172273217,
  "quoteType": 3,
  "rateList": [
    {
      "accessorialTypeCode": "ConAuto",
      "currencyCode": "USD",
      "effectiveDate": "2021-10-26T00:00:00Z",
      "isOptional": false,
      "originalTotalRate": 0.0,
      "quantity": 912.0,
      "rateCode": "405",
      "rateCodeValue": "Fuel Surcharge",
      "rateDescription": "405 - Fuel Surcharge",
      "rateEntryType": "Automatic",
      "rateId": 380497038,
      "rateSource": "SGA",
      "rateTypeCode": "M",
      "rateUsed": "USD 228.0000 Per Mile",
      "totalRate": 228.00,
      "unitRate": 0.25
    },
    {
      "accessorialTypeCode": "ConAuto",
      "currencyCode": "USD",
      "effectiveDate": "2021-09-21T00:00:00Z",
      "isOptional": false,
      "originalTotalRate": 0.0,
      "quantity": 1.0,
      "rateCode": "LAA",
      "rateCodeValue": "Labor",
      "rateDescription": "LAA - Labor",
      "rateEntryType": "Automatic",
      "rateId": 380497039,
      "rateSource": "SGA",
      "rateTypeCode": "F",
      "rateUsed": "USD 15.0000 Fixed Charge",
      "totalRate": 15.0,
      "unitRate": 15.0
    },
    {
      "accessorialTypeCode": "GenAuto",
      "currencyCode": "USD",
      "isOptional": false,
      "originalTotalRate": 0.0,
      "quantity": 1.0,
      "rateCode": "400",
      "rateCodeValue": "Line Haul",
      "rateDescription": "400 - Line Haul",
      "rateEntryType": "0",
      "rateId": 380497040,
      "rateSource": "Transactional",
      "rateTypeCode": "F",
      "totalRate": 2439.15,
      "unitRate": 2439.15
    }
  ],
  "referenceNumberList": [],
  "serviceOfferingId": 1481,
  "totalAccessorialCharge": 243.00,
  "totalCharge": 2682.15,
  "totalFreightCharge": 2439.15,
  "transit": {
    "maximumDeliveryDate": "2022-06-12T00:00:00Z",
    "maximumPickupDate": "2022-06-09T00:00:00Z",
    "maximumTransitDays": 3,
    "minimumDeliveryDate": "2022-06-11T00:00:00Z",
    "minimumPickupDate": new Date("2022-06-09T00:00:00Z"),
    "minimumTransitDays": 2,
    "transitType": 2
  },
  "transportModeDescription": "TL",
  "transportModeType": 2
};

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i);
}

export const generateRates = function(startDate: Date){
  return range(0, 13).map(function(idx){
    const newDate = addDays(startDate, idx);
    // console.log(newDate)
    // console.log(new Date(`${newDate.year}-${newDate.month}-${newDate.date}`))
    return {
      ...base,
      transit: {
        ...base.transit,
        minimumPickupDate: new Date(`${newDate.year}-${newDate.month}-${newDate.dayOfMonth}`)
      },
      totalCharge: Math.round(Math.random() * 2000) + 1000,
    }
  });
}