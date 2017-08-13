const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var message = generateMessage('clinton', "test message");
    expect(message).toInclude({from: 'clinton', text: "test message"});
    expect(message.createdAt).toBeA('number');
  });
});


describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var latitude = 33.4511, longitude = -120.2333
    var message = generateLocationMessage('clinton', latitude, longitude);
    expect(message).toBeA('object');
    expect(message.createdAt).toBeA('number');
    expect(message.url).toBe(`https://www.google.com/maps/?q=${latitude},${longitude}`)
  });
});
