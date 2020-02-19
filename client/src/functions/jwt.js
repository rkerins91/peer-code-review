var jwtDecode = require("jwt-decode");

const getToken = () => {
  let token = localStorage.getItem("peercode-auth-token");
  return token;
};

const decodeToken = token => {
  var decodedToken = jwtDecode(token);
  return decodedToken;
};

async function fetchUser(decodedToken) {
  async function loginUser(user) {
    try {
      const res = await fetch("/user", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const json = await res.json();
      if (json.errors) {
        console.log(json.errors);
        return {}; // if there is an error, return empty user object
      } else {
        if ((json.success = true)) {
          return json.user;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  let user = {
    _id: decodedToken.user._id,
    email: decodedToken.user.email
  };
  let userObject = await loginUser(user);
  return userObject;
}

export const authJWT = () => {
  let token = getToken();
  // todo - verify token not expired
  let decodedToken = decodeToken(token);
  return fetchUser(decodedToken);
};
