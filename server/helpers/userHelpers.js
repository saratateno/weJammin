module.exports = {
  users: users,
  removeUser: removeUser,
  userColor: userColor
}

var users = [];

function getUser(socketId) {
  return users.filter(function(user) {
    return user.socketId === socketId;
  })[0];
}

function getOthers(socketId) {
  return users.filter(function(user) {
    return user.socketId !== socketId;
  })
}

function removeUser(socketId, callback) {
  users = getOthers(socketId);
  if (callback) { callback(); }
}

function userColor(socketId) {
  return getUser(socketId).color;
}

