const expect = require('chai').expect;
const {isRealString} = require('./validation.js');

describe('isRealString tests', () =>{
    it('should reject non string values', () =>{
        let result = isRealString(24);
        expect(result).to.be.false;
    });

    it('should reject string with white spaces only', () =>{
        expect(isRealString('     ')).to.be.false;
    });

    it('should allow string with white spaces chars', () =>{
        expect(isRealString('  LOTR')).to.be.true;
    });
});

