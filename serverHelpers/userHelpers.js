module.exports = {
  removeUser: removeUser,
  userColor: userColor,
  getUser: getUser,
  getOthers: getOthers
};

function getUser(users, socketId) {
  return users.filter(function(user) {
    return user.socketId === socketId;
  })[0];
}

function getOthers(users, socketId) {
  return users.filter(function(user) {
    return user.socketId !== socketId;
  });
}

function removeUser(users, socketId, callback) {
  var newUsers = getOthers(users, socketId);
  if (callback) { callback(newUsers); }
}

function userColor(users, socketId) {
  var user = getUser(users,socketId)
  if (user) {
    return user.color;
  else {
    return 'red';
  }
}
