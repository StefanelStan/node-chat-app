const expect = require('chai').expect;
var {generateMessage} = require('./message.js'); 

describe('generateMessage', () => {
    it('should generate a correct message object', () => {
        let from = 'From Test1';
        let text = 'Text Test1';
        
        let response = generateMessage(from, text);
        expect(response).to.not.be.null;
        expect(response).to.deep.include({from, text});
        expect(response.createdAt).to.be.a('number');
    });
});

