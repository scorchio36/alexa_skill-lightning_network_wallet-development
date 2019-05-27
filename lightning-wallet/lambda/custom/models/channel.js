function Channel(pubKey, fundingAmt) {

  this.pubKey = pubKey;
  this.fundingAmt = fundingAmt;

}

Channel.prototype.getPubKey = function() {
  return this.pubKey;
}

Channel.prototype.getFundingAmt = function() {
  return this.fundingAmt;
}

module.exports = Channel;
