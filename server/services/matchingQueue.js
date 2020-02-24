const Queue = require("bull");
const { matchingQueries, connectDB } = require("../database");
const { assignThread } = require("../controllers/user");
const { addToNoAssign } = require("../controllers/thread");
const config = require("../config/config");
const matchingQueue = new Queue("candidate matching");

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
  const thread = job.data.thread;
  // Check if thread already has a reviewer
  if (thread.reviewer) {
    done();
  }
  try {
    const candidates = await matchingQueries.getCandidates(thread);
    if (candidates === []) {
      throw new Error("No candidates found");
    }
    done(null, { assignee: candidates[0] }); //take the first off the list for now
  } catch (error) {
    // Find a candidate
    done(error);
  }
});

matchingQueue.on("error", error => {
  console.log(error);

  if (error === "No candidates found") {
    //matching failed due to not finding any matches
    job.data.pass++; // increment pass to expand matching criteria
    matchingQueue.add(job.data);
  }
});

matchingQueue.on("completed", async (job, result) => {
  console.log("Job Complete");
  try {
    const assignedUser = await assignThread(
      //make the assignment
      result.assignee._id,
      job.data.thread._id
    );
    console.log(`assignment succeded to user ${assignedUser.email}`);
    addToNoAssign(job.data.thread, result.assignee._id);
    //queue a delayed job to check if the assigned thread has changed status
    matchingQueue.add(job.data, { delay: config.server.assignmentTimeout });
  } catch (error) {
    console.error(error);
  }
});

module.exports = matchingQueue;
