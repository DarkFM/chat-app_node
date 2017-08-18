[{
  id: '12m988$0/class',
  name: 'Clinton',
  room: 'Soccer Fans'
}]

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    // return user that was removed
    var removedUser = {};
    this.users = this.users.filter((user) => {
      if(user.id === id) {
        removedUser = user;
        return false;
      }
      return true;
    });
    return removedUser;
  }
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} years(s) old`;
//   }
// }
//
// var me = new Person("Clinton",24);
// var description = me.getUserDescription();
// console.log(description);
