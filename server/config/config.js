const config = {
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
    assignmentTimeout: 86400000 // 30 seconds for testing
  },
  stripe: {
    stripeSecret: process.env.STRIPE_SECRET_KEY
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretKey: process.env.AWS_SECRET,
    bucketName: "peer-code"
  }
};

module.exports = config;
