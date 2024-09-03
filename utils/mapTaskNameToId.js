export const mapTaskNameToId = (tasks, taskName) => {
  const task = tasks.find((task) => task.taskName === taskName);
  return task ? task.id : null;
};
