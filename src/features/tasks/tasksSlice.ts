import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getTasks } from "../../services/api";
import { ITask } from "../../types/task";

export const initTasks = createAsyncThunk(
  "tasks/fetchTasksFromServer",
  async () => getTasks()
);

interface TasksState {
  tasks: ITask[];
  error: boolean;
  loading: boolean;
  idTaskToDelete: string;
  taskToEdit: ITask | null;
}

const initialState: TasksState = {
  tasks: [],
  error: false,
  loading: false,
  idTaskToDelete: "",
  taskToEdit: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<ITask>) => {
      state.tasks.unshift(payload);
    },
    deleteTask: (state, { payload: idTaskToDelete }: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== idTaskToDelete);
    },
    updateTask: (state, { payload: taskToEdit }: PayloadAction<ITask>) => {
      state.tasks = state.tasks.map((task) => {
        if (taskToEdit?.id === task.id) {
          return taskToEdit;
        }

        return task;
      });
    },
    setIdTaskToDelete: (state, { payload }: PayloadAction<string>) => {
      state.idTaskToDelete = payload;
    },
    setTaskToEdit: (state, { payload }: PayloadAction<ITask>) => {
      state.taskToEdit = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      initTasks.fulfilled,
      (state, { payload }: PayloadAction<ITask[]>) => {
        state.tasks = payload;
        state.loading = false;
        state.error = false;
      }
    );

    builder.addCase(initTasks.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(initTasks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  setIdTaskToDelete,
  setTaskToEdit,
} = tasksSlice.actions;

export default tasksSlice.reducer;
