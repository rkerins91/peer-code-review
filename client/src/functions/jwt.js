var jwtDecode = require("jwt-decode");

const getToken = () => {
  let token = localStorage.getItem("peercode-auth-token");
  return token;
};

export const removeToken = () => {
  localStorage.removeItem("peercode-auth-token");
};

const decodeToken = token => {
  var decodedToken = jwtDecode(token);
  return decodedToken;
};

export const authJWT = () => {
  let token = getToken();
  if (token) {
    return decodeToken(token);
  }
  return null;
};
