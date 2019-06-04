function Address(nickname, lightningAddr, object) {

  if(object==undefined) {
    this.nickname = nickname;
    this.lightningAddr = lightningAddr;
  }
  else {
    Object.assign(this, object); //copy constructor for object
  }

}

Address.prototype.getNickname = function() {
  return this.nickname;
}

Address.prototype.setNickname = function(nickname) {
  this.nickname = nickname;
}

Address.prototype.getLightningAddr = function() {
  return this.lightningAddr;
}

Address.prototype.setLightningAddr = function(lightningAddr) {
  this.lightningAddr = lightningAddr;
}

//The public key is the string before the '@' symbol in the lighting address
Address.prototype.getPubKey = function() {
  return this.lightningAddr.slice(0, this.lightningAddr.indexOf("@"));
}

module.exports = Address;
