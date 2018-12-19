/*
*
*
*       Complete the handler logic below
*       \d+\.?/?
*       
*/
const numberRegex = /\d+((\.?)\d+)?((\/?)\d+)?/;
const unitRegex = /(mi\b)|(lbs\b)|(gal\b)|(km\b)|(kg\b)|(l\b)/i;
const impUnits = ['mi', 'lbs', 'gal'];
const metricUnits = ['km', 'kg', 'l'];

const fractionToDecimalConverter = (fraction) => {
  const parts = fraction.split('/');
  return parts[0] /parts[1];
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    if(input.match(numberRegex) === null) return 1;
    else if(input.match(/\d+((\/?)\d+)/g).length >= 2) return 'Invalid Number';
    else return input.match(numberRegex)[0];
  };
  
  this.getUnit = function(input) {
    if(input.match(unitRegex) === null) return 'Invalid Units';
    return (impUnits.includes(input.match(unitRegex)[0].toLowerCase()) || metricUnits.includes(input.match(unitRegex)[0].toLowerCase())) ? input.match(unitRegex)[0] : 'Invalid Units';
  };
  
  this.getReturnUnit = function(initUnit) {
    if(impUnits.includes(initUnit))
      return metricUnits[impUnits.indexOf(initUnit)];
    else
      return impUnits[metricUnits.indexOf(initUnit.toLowerCase())];
  };

  this.spellOutUnit = function(unit) {
     switch(unit){
       case 'gal':
         return 'gallon(s)';
       case 'l':
       case 'L':
         return 'liter(s)';
       case 'mi':
         return 'mile(s)';
       case 'km':
         return 'kilometer(s)';
       case 'lbs':
         return 'pound(s)';
       case 'kg':
         return 'kilogram(s)';
       default:
         return 'No unit defined';
   }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let decimal = initNum;
    
    // If fraction is present need to convert to decimal.
    
    
    switch(initUnit){
      case 'gal':
        return decimal * galToL;
      case 'l':
      case 'L':
        return decimal / galToL;
      case 'mi':
        return decimal * miToKm;
      case 'km':
        return decimal / miToKm;
      case 'lbs':
        return decimal * lbsToKg;
      case 'kg':
        return decimal / lbsToKg;
      default:
        return 'No units defined';
   }
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;