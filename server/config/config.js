const config = {
  db: {
    connectionString: process.env.MONGO_URI_DEV
  },
  jwt: {
    secret: process.env.SECRET,
    tokenExpirationPolicy: "31536000" //one year in seconds
  },
  server: {
    availableLanguages: ["C", "C++", "Java", "JavaScript", "Python", "Ruby"]
  }
};

module.exports = config;
