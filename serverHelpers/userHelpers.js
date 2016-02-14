module.exports = {
  removeUser: removeUser,
  userColor: userColor
}

function getUser(users, socketId) {
  return users.filter(function(user) {
    return user.socketId === socketId;
  })[0];
}

function getOthers(users, socketId) {
  return users.filter(function(user) {
    return user.socketId !== socketId;
  })
}

function removeUser(users, socketId, callback) {
  newUsers = getOthers(users, socketId);
  if (callback) { callback(newUsers); }
}

function userColor(users, socketId) {
  return getUser(users,socketId).color;
}
