const jwt = require('jsonwebtoken');

function createToken(o){
  const token = jwt.sign({
    data: o,
  },
);
  return token;
}

function verifyToken(token) {
  let result = jwt.verify(token) || {};
  return result;
}

module.exports = {
  createToken: createToken,
  verifyToken: verifyToken
}