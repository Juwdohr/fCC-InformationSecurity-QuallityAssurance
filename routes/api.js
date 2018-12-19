/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
      if(initNum === 'Invalid Number' && initUnit !== 'Invalid Units') {
        res.status(500).json({ error: initNum });
      }
    
      if(initNum !== 'Invalid Number' && initUnit === 'Invalid Units') {
        res.status(500).json({ error: initUnit });
      }
      
      if(initNum === 'Invalid Number' && initUnit === 'Invalid Units') {
        res.status(500).json({ error: `${initNum} and ${initUnit}` });
      }
    
      res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString});
    });
    
};
