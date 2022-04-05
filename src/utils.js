const jwt = require("jsonwebtoken");
const APP_SECRET = "mysecret";

function getTokenPayload(token) {
  const payload = jwt.verify(token, APP_SECRET);
  return payload;
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if(!token) {
        throw new Error("No token found");
      }
      const {userId}  = getTokenPayload(token);
      return userId;
    }
  } else {
    const {userId} = getTokenPayload(authToken);
    return userId; 
  }

  throw new Error('Not authenticated');

}

module.exports = {
  APP_SECRET,
  getUserId
};