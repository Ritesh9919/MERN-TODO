import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastConfig } from "../utils";
import {useDispatch, useSelector} from 'react-redux';
import {todoReducer, getInitialStateAsync, addTodoAsync, toggleTodoAsync, deleteTodoAsync} from '../redux/reducer/todoReducer';
import { useNavigate } from "react-router-dom";
const url = "http://localhost:8000";

const Todo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState("");
  const todos = useSelector((state)=> state.todoReducer.todos);
  console.log(todos);


  useEffect(()=> {
      dispatch(getInitialStateAsync())
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if(!token) {
      toast.error('Unauthorized', toastConfig);
      navigate('/login');

    }
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
      <form class="w-[50vw] shadow-lg  mx-auto mt-10 py-5" onSubmit={(e) => handleSubmit(e)}>
        <h1 class="text-center text-lg font-bold">Todo</h1>
        <div>
          <input
            type="text"
            placeholder="Add todo"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)} class="block w-[60%] mx-auto text-center py-2 my-5 border-2 border-gray-400 outline-none rounded-md"
          />
        </div>
        <button class="block px-2 py-2 border mx-auto bg-green-400 text-white border-gray-500 rounded-lg " type="submit">Add Todo</button>
      </form>

      <div>
         {todos.map((todo)=> {
          return (
            <ul>
              <li class="w-[50%] py-3 border-2 border-red-500 mx-auto flex justify-around font-sans my-5">
                <p class="text-md">{todo.text}</p>
                <p>{todo.createdAt}</p>
                <p class={todo.completed ? 'bg-green-400 px-2 py-1 rounded-md':'bg-red-500 px-2 py-1 rounded-md'}>{todo.completed ? 'Completed':'Pending'}</p>
                <button onClick={()=> handleToggle(todo._id)} class="bg-yellow-300 px-2 py-1 rounded-sm">Toggle</button>
                <button onClick={()=> handleDelete(todo._id)} class="bg-red-300 px-2 py-1 rounded-sm">Delete</button>
              </li>
            </ul>
          )
         })}
      </div>
    </>
  );
};

export default Todo;
