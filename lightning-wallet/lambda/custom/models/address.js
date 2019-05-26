function Address(nickname, pubKey) {

  this.nickname = nickname;
  this.pubKey = pubKey;

}

Address.prototype.getNickname = function() {
  return this.nickname;
}

Address.prototype.setNickname = function(nickname) {
  this.nickname = nickname;
}

Address.prototype.getPubKey = function() {
  return this.pubKey;
}

Address.prototype.setPubKey = function(pubKey) {
  this.pubKey = pubKey;
}

module.exports = Address;
