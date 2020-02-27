const config = {
  constants: {
    notificationExpiry: 15552000
  },
  db: {
    connectionString: process.env.MONGO_URI_DEV
  },
  jwt: {
    secret: process.env.SECRET,
    tokenExpirationPolicy: "31536000" //one year in seconds
  },
  server: {
    availableLanguages: ["C", "C++", "Java", "JavaScript", "Python", "Ruby"],
    threadStatus: ["new", "assigned", "ongoing", "complete", "archived"],
    notificationEvents: ["new review", "new assignment", "new post"],
    assignmentTimeout: 30000 // 30 seconds for testing
  }
};

module.exports = config;
