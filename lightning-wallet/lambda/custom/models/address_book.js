function AddressBook() {

  this.addressList = [];

}

AddressBook.prototype.addAddress = function(address) {
  this.addressList.push(address);
}

AddressBook.prototype.removeAddress = function(address) {

}

AddressBook.prototype.getAddressList= function() {
  return this.addressList;
}

module.exports = AddressBook;
