module.exports = {
  removeUser: removeUser,
  userColor: userColor,
  getUser: getUser,
  getOthers: getOthers,
  snapToBeat: snapToBeat,
  chooseColor: chooseColor
};

var colors = ['purple', 'red', 'orange', 'green'];

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
  } else {
    return 'red';
  }
}

function chooseColor() {
  rotateColors();
  return colors[0];
}

function rotateColors() {
  var first = colors[0];
  var rest = colors.slice(1);
  rest.push(first);
  colors = rest;
}

function snapToBeat(transportPosition){
  var cleanPosition, pieces, lastNum, roundLastNum, sixteenths;
  pieces = transportPosition.split([":"]);
  lastNum = parseFloat(pieces[pieces.length - 1]);
  roundLastNum = Math.round(lastNum);
  sixteenths = convertBarToSixteenth(pieces[0]) +
                      convertQtrToSixteenth(pieces[1]) +
                      roundLastNum;
  cleanPosition = "0:0:" + sixteenths;
  return cleanPosition;
}

function convertBarToSixteenth(numBars) {
  return parseInt(numBars) * 16;
}

function convertQtrToSixteenth(numQtr) {
  return parseInt(numQtr) * 4;
}
