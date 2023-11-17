import { combineReducers } from "redux";
import tasksReducer from "../features/tasks";

export const rootReducers = combineReducers({
  tasks: tasksReducer,
});
