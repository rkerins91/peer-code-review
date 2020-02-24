const Queue = require("bull");
const { matchingQueries, connectDB } = require("../database");
const { assignThread } = require("../controllers/user");
const config = require("../config/config");
const matchingQueue = new Queue("match-reviewer");

connectDB();

/* job object:
    {
        thread: instance of Thread model
        pass: number of matching passes (not implemented)
    }

    result object:
    {
        assignee: user_id of assigned user, null if assignment failed + error message will be populated
    }
*/

matchingQueue.process(async (job, done) => {
  // Check if thread already has a reviewer
  if (job.thread.reviewer) {
    done();
  }
  try {
    const candidates = await matchingQueries.getCandidates(job.thread);
    done(null, { assignee: candidates[0] }); //take the first off the list for now
  } catch (error) {
    // Find a candidate
    done(error);
  }
});

matchingQueue.on("completed", async (job, result) => {
  if (result.error) {
    console.error(result.error);
    if (!result.assignee) {
      //matching failed due to not finding any matches
      job.pass++; // increment pass to expand matching criteria
      matchingQueue.add(job);
    }
  } else {
    try {
      const assignedUser = await assignThread(result.assignee, job.thread._id);
      console.log(
        `Job complete, assignment succeded to user ${assignedUser.email}`
      );
      //queue a delayed job to check if the assigned thread has changed status
      matchingQueue.add(job, { delay: config.server.assignmentTimeout });
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = { matchingQueue };
