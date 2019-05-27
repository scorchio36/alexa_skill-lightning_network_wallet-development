const ChannelList = require('./channel_list');
const AddressBook = require('./address_book');

function User(object) {

  if(object==undefined) {

    this.balance = 0;
    this.channelList = new ChannelList();
    this.addressBook = new AddressBook();

  }
  //A copy contructor is necessary to change Object object to
  else {
  //a User object after JSON.parse
    Object.assign(this, object); //copy constructor for object
  }

}

User.prototype.getBalance = function() {
  return balance;
}
User.prototype.setBalance = function(balance) {
  this.balance = balance;
}

User.prototype.getAddressBook = function() {
  return this.addressBook;
}

User.prototype.getChannelList = function() {
  return this.channelList;
}

module.exports = User;
