const expect = require('chai').expect;
var {generateMessage, generateLocationMessage} = require('./message.js'); 

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

describe('generate location message', () =>{
    it('should get the corrrect message', () => {
        let from = 'From Test1';
        let response = generateLocationMessage(from, 40, 30);
        expect(response).to.not.be.null;
        expect(response.from).to.deep.equal(from);
        expect(response.url).to.deep.equal('https://www.google.com/maps?q=40,30');
        expect(response.createdAt).to.be.a('number'); 
    });
});

