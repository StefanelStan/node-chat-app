var expect = require('chai').expect;
var {isRealString} = require ('./validation.js');

describe('isRealString tests', () =>{
    if('should reject non string values', () =>{
        expect(isRealString(24)).to.be.false;
    });

    if('should reject string with white spaces only', () =>{
        expect(isRealString('     ')).to.be.false;
    });

    if('should allow string with white spaces chars', () =>{
        expect(isRealString('  LOTR')).to.be.true;
    });
});

