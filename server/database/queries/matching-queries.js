const User = require("../models/User");

module.exports = {
  //returns an array of user_ids that fit the filter criteria.
  getCandidates: async thread => {
    const language = thread.language.name;
    const expLevel = thread.language.experience;

    /*
    1. Candidate is not this thread's no_assign list
    2. Candidate's experience level in the thread language > than the thread requester's
    3. Candidate's assigned_threads length <= 5
    */
    console.log("getting candidates");

    const results = await User.find(
      {
        _id: { $not: { $in: thread.no_assign } },
        [`experience.${language}`]: { $exists: true },
        [`experience.${language}`]: { $gt: expLevel }
        //assigned_count: { $lt: 2 } // set to 2 for testing.
      },
      "_id"
    );

    console.log(results);
    return results;
  }
};
