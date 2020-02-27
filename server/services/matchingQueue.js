const Queue = require("bull");
const { matchingQueries } = require("../database");
const { assignThread, unassignThread } = require("../controllers/user");
const { addToNoAssign, updateStatus } = require("../controllers/thread");
const config = require("../config/config");
const matchingQueue = new Queue("candidate matching");
const io = require("../bin/www");

/* job object:
    {
        thread: instance of Thread model
        currentAssignee: user_id of assignee previously set from the result obj
        pass: number of matching passes (not implemented)
    }

    result object:
    {
        assignee: user_id of assigned user, null if assignment failed + error message will be populated
    }
*/

matchingQueue.process(async (job, done) => {
  const thread = job.data.thread;
  try {
    if (thread.status === config.server.threadStatus.indexOf("ongoing")) {
      throw new Error("Thread already has a reviewer");
    } else if (job.data.currentAssignee) {
      // if true, thread had been assigned previously and is now declined or timed-out
      // remove thread from the current assignee
      unassignThread(job.data.currentAssignee, thread._id);
    }
    const candidates = await matchingQueries.getCandidates(thread);
    if (candidates.length === 0) {
      throw new Error("No candidates found");
    }
    done(null, { assignee: candidates[0] }); //take the first off the list for now
  } catch (error) {
    // pass thrown errors into done function.
    done(error);
  }
});

matchingQueue.on("error", error => {
  console.error(error);
});

matchingQueue.on("failed", async (job, error) => {
  console.log(`Job failed
  ${error}`);
  if (error.message === "No candidates found") {
    console.log("clean up and rematch");
    //matching failed due to not finding any matches
    if (job.data.currentAssignee) {
      // clean up assignee if there is one
      await unassignThread(job.data.currentAssignee, job.data.thread._id);
      job.data.currentAssignee = null;
    }
    if (job.data.pass < 3) {
      //requeue if this request wasn't queued 3 times already.
      job.data.pass++;
      matchingQueue.add(job.data);
    } else {
      //if no matches can be found in multiple passes, enqueue a delayed search.
      matchingQueue.add(job.data, { delay: config.server.assignmentTimeout });
    }
  }
});

matchingQueue.on("completed", async (job, result) => {
  console.log("Job Complete");
  try {
    if (!result.assignee) {
      throw new Error("No candidates found");
    }
    const threadId = job.data.thread._id;
    const assigneeId = result.assignee._id;

    const assignedUser = await assignThread(
      //make the assignment
      assigneeId,
      threadId
    );
    console.log(`assignment succeded to user ${assignedUser.email}`);
    await updateStatus(threadId, "assigned");
    const updatedThread = await addToNoAssign(threadId, assigneeId);

    //update job obj
    job.data.thread = updatedThread;
    job.data.currentAssignee = result.assignee._id;
    //queue a delayed job to check if the assigned thread has changed status
    matchingQueue.add(job.data, { delay: config.server.assignmentTimeout });
  } catch (error) {
    console.error(error);
  }
});

module.exports = matchingQueue;
