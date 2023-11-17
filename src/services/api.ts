const BASE_URL = "http://localhost:3000";

export const getTasks = async () => {
  const tasksFromServer = await fetch(`${BASE_URL}/taskList`);
  return await tasksFromServer.json();
};
