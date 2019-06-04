function AddressBook(object) {

  if(object==undefined) {
    this.addressList = [];
  }
  else {
    Object.assign(this, object); //copy constructor for object
  }

}

AddressBook.prototype.addAddress = function(address) {
  this.addressList.push(address);
}

AddressBook.prototype.removeAddress = function(address) {

}

AddressBook.prototype.getAllAddresses = function() {
  return this.addressList;
}

AddressBook.prototype.getAddressFromNickname = function(nickname) {
  //This method assumes each 'nickname' is unique
  for(var i=0; i<this.addressList.length; i++)
    if(sanitize(this.addressList[i].nickname) == sanitize(nickname))
      return this.addressList[i];
    else
      return null;
}

//Check if the given nickname is in the address book
AddressBook.prototype.isNicknameInAddressBook = function(nickname) {
  for(var i=0; i<this.addressList.length; i++) {
    if(sanitize(this.addressList[i].nickname) == sanitize(nickname))
      return true;

  return false;
  }
}

AddressBook.prototype.getLength = function() {
  return this.addressList.length;
}

//Cleans up string to make it easy to compare with another string
function sanitize(string) {
  return string.toLowerCase().trim();
}

module.exports = AddressBook;
