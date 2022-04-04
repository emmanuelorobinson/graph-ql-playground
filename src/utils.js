const jwt = require("jsonwebtoken");
const APP_SECRET = "mysecret";

function getTokenPayload(token) {
  const payload = jwt.verify(token, APP_SECRET);
  return payload;
}

function getUserById(req, authToken) {
}