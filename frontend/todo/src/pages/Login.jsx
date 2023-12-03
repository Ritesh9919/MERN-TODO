import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import {toastConfig} from '../utils/index';
import { useNavigate } from "react-router-dom";

const Login = ()=> {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email:"",
    password:""
  })


  const handleSubmit = async(e)=> {
    e.preventDefault();
    const url = 'http://localhost:8000';
    const {data} = await axios.post(`${url}/api/users/login`, {
      email:value.email,
      password:value.password
    });

    localStorage.setItem('accessToken', data.accessToken);
    toast.success(data.msg, toastConfig);
    navigate('/');
  }


  const handleChange = async(e)=> {
    setValue({...value, [e.target.name]:e.target.value});
  }

    return (
      <>
      <form className='w-80 shadow' onSubmit={(e)=> handleSubmit(e)} class="shadow-md w-[40%] mx-auto py-5 mt-10 flex flex-col justify-center items-center gap-5">
        <h1 class="text-center text-2xl font-bold font-mono">Login</h1>
      
        <div>
          <input type="email" placeholder="Email" name="email" onChange={(e)=> handleChange(e)} class="text-center py-2 px-10 border-2 border-gray-500 outline-none rounded-md"/>
        </div>
        <div>
          <input type="password" placeholder="password" name="password" onChange={(e)=> handleChange(e)} class="text-center py-2 px-10 border-2 border-gray-500 outline-none rounded-md"/>
        </div>
          <button type="submit" class="px-3 py-1 rounded-md bg-green-400">Login</button>
          
        
        
      </form>
      </>
    )
  }
  
  
  export default Login;