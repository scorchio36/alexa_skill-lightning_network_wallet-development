function ChannelList() {
  this.channelList = [];
}

ChannelList.prototype.addChannel = function(channel) {

  this.channelList.push(channel);

}

ChannelList.prototype.removeChannel = function(channel) {

}

ChannelList.prototype.length = function() {
  return this.channelList.length;
}
module.exports = ChannelList;
