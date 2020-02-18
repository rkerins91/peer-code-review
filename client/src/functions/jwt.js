var jwtDecode = require("jwt-decode");

const getToken = () => {
  let token = localStorage.getItem("peercode-auth-token");
  return token;
};

const decodeToken = token => {
  var decodedToken = jwtDecode(token);
  return decodedToken;
};

export const authJWT = () => {
  let token = getToken();
  return decodeToken(token);
};
