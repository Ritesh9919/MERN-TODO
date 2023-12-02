import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastConfig } from "../utils";
import {useDispatch, useSelector} from 'react-redux';
import {todoReducer, getInitialStateAsync, addTodoAsync, toggleTodoAsync, deleteTodoAsync} from '../redux/reducer/todoReducer';
const url = "http://localhost:8000";

const Todo = () => {
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState("");
  const todos = useSelector((state)=> state.todoReducer.todos);
  console.log(todos);


  useEffect(()=> {
      dispatch(getInitialStateAsync())
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addTodoAsync(todoText))
    setTodoText("");
    
  };

  const handleToggle = (todoId) => {
      dispatch(toggleTodoAsync(todoId))
  }

  const handleDelete = (todoId)=> {
    dispatch(deleteTodoAsync(todoId));
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Todo</h1>
        <div>
          <input
            type="text"
            placeholder="Add todo"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </div>
        <button type="submit">Add Todo</button>
      </form>

      <div>
         {todos.map((todo)=> {
          return (
            <ul>
              <li>
                <p>{todo.text}</p>
                <p>{todo.createdAt}</p>
                <p>{todo.completed ? 'Completed':'Pending'}</p>
                <button onClick={()=> handleToggle(todo._id)}>Toggle</button>
                <button onClick={()=> handleDelete(todo._id)}>Delete</button>
              </li>
            </ul>
          )
         })}
      </div>
    </>
  );
};

export default Todo;
