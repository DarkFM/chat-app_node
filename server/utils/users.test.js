const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'mike',
      room: 'node course'
    }, {
      id: '2',
      name: 'jen',
      room: 'react course'
    }, {
      id: '3',
      name: 'julie',
      room: 'node course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {id: '123', name: 'Clinton', room: "The Office Fans"};
    var resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user]);
  })

  it('should remove a user', () => {
    var user = users.removeUser('1');
    expect(user).toInclude({id: '1', name: 'mike'});
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var user = users.removeUser('33');
    expect(user).toEqual({});
  });

  it('should find user', () => {
    var user = users.getUser('3');
    expect(user).toInclude({id: '3', name: 'julie'});
  });

  it('should not find user', () => {
    var user = users.getUser('454');
    expect(user).toNotExist();
  });


  it('should return names for node course', () => {
    var userList = users.getUserList('node course');
    expect(userList).toEqual(['mike', 'julie'])
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('react course');
    expect(userList).toEqual(['jen'])
  });
});
