const AddressBook = require('./address_book');

function User() {

  this.balance = 0;
  this.addressBook = new AddressBook();

}

User.prototpye.getBalance = function() {
  return balance;
}
User.prototype.setBalance = function(balance) {
  this.balance = balance;
}
