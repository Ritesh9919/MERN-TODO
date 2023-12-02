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
      <form className='w-80 shadow' onSubmit={(e)=> handleSubmit(e)}>
        <h1>Login</h1>
      
        <div>
          <input type="email" placeholder="Email" name="email" onChange={(e)=> handleChange(e)} />
        </div>
        <div>
          <input type="password" placeholder="password" name="password" onChange={(e)=> handleChange(e)} />
        </div>
        <div>
          <button type="submit">Login</button>
          
        </div>
        
      </form>
      </>
    )
  }
  
  
  export default Login;