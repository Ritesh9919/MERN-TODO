import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = "http://localhost:8000";

export const getInitialStateAsync = createAsyncThunk(
  "todo/getIntialState",
  async () => {
    const token = localStorage.getItem("accessToken");
    return await axios.get(`${url}/api/todos`, {
      headers: { Authorization: token },
    });
  }
);

export const addTodoAsync = createAsyncThunk(
  "todo/addTodo",
  async (payload) => {
    const token = localStorage.getItem("accessToken");
    const { data } = await axios.post(
      `${url}/api/todos`,
      {
        text: payload,
      },
      {
        headers: { Authorization: token },
      }
    );

    return data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todo/toggle",
  async (payload) => {
    const token = localStorage.getItem("accessToken");
    const { data } = await axios.put(
      `${url}/api/todos/${payload}/toggle`,
      {},
      {
        headers: { Authorization: token },
      }
    );

    return data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todo/delete",
  async(payload) => {
    const token = localStorage.getItem("accessToken");
    const {data} = await axios.delete(`${url}/api/todos/${payload}`, {
      headers:{Authorization:token}
    })
    return data;
  }
);

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInitialStateAsync.fulfilled, (state, actions) => {
        state.todos = [...actions.payload.data.todos];
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload.todo);
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        console.log("***", action.payload.todo.text);
        state.todos.map((todo, index) => {
          if (todo.text == action.payload.todo.text) {
            state.todos.splice(index, 1, action.payload.todo);
          }
        });
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action)=> {
        console.log("***", action.payload.todo._id);
        state.todos.map((todo, index)=> {
          console.log("&&&", todo._id)
          if(todo._id == action.payload.todo._id) {
            state.todos.splice(index, 1);
          }
        })
      })
  },
});

export const todoReducer = todoSlice.reducer;
export const actions = todoSlice.actions;
