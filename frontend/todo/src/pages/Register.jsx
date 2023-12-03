import {Link} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {toastConfig} from '../utils/index';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name:"",
    email:"",
    password:""
  })

  
const handleSubmit = async(e)=> {
  e.preventDefault()
  const url = 'http://localhost:8000';
  const {data} = await axios.post(`${url}/api/users/register`, {
    name:value.name,
    email:value.email,
    password:value.password
  });

  toast.success(data.msg, toastConfig);
  navigate('/login')
}


  const handleChange = (e)=> {
    setValue({...value, [e.target.name]:e.target.value});
  }

  return (
    <>
      <form onSubmit={(e)=> handleSubmit(e)} class="shadow-md w-[40%] mx-auto py-5 mt-10 flex flex-col justify-center items-center gap-5">
        <h1 class="text-center text-2xl font-bold font-mono">Register</h1>
        <div>
          <input type="text" placeholder="Name" name="name" onChange={(e)=> handleChange(e)} class="text-center py-2 px-10 border-2 border-gray-500 outline-none rounded-md" />
        </div>
        <div>
          <input type="email" placeholder="Email" name="email" onChange={(e)=> handleChange(e)} class="text-center py-2 px-10 border-2 border-gray-500 outline-none rounded-md"/>
        </div>
        <div>
          <input type="password" placeholder="password" name="password" onChange={(e)=> handleChange(e)} class="text-center py-2 px-10 border-2 border-gray-500 outline-none rounded-md"/>
        </div>
        <div>
          <button type="submit" class="px-3 py-1 rounded-md bg-green-400">Register</button>
          
        </div>
        <span>Already register ? <Link class="underline" to="/login">Login</Link></span>
      </form>
    </>
  );
};

export default Register;
