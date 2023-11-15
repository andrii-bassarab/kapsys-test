export const getTasks = async () => {
  const tasksFromServer = await fetch("http://localhost:3000/taskList");
  const data = await tasksFromServer.json();

  return data;
};
