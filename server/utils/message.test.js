const expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var message = generateMessage('clinton', "test message");
    expect(message).toInclude({from: 'clinton', text: "test message"});
    expect(message.createdAt).toBeA('number');
  })

});
