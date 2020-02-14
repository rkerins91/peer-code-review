var jwtDecode = require("jwt-decode");

export const authJWT = token => {
  var decodedToken = jwtDecode(token);
  console.log(decodedToken);
  return decodedToken;
};
