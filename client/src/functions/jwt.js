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
  async function getUser(id) {
    try {
      const res = await fetch(`/user/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res);
      const json = await res.json();
      console.log(json);
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

  // check for empty token
  if (!decodedToken) {
    return null;
  } else {
    let id = decodedToken.user._id;
    let userObject = await getUser(id);
    return userObject;
  }
}

export const authJWT = () => {
  let token = getToken();
  if (token) {
    let decodedToken = decodeToken(token);
    return fetchUser(decodedToken);
  } else return null;
};
