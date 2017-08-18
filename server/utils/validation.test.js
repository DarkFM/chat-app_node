const expect = require('expect');

const isRealString = require('./validation');

describe('is Real string', () => {
  it('should reject nonString values', () => {
    var nonString = 587;
    expect(isRealString(nonString)).toNotExist();
  });

  it('Should reject strings with only spaces', () => {
    var str = '     ';
    expect(isRealString(str)).toNotExist();
  });

  it('should allow atring with non-space characters', () => {
    var str = "ue ieiei e er    ";
    expect(isRealString(str)).toExist();
  });

});
