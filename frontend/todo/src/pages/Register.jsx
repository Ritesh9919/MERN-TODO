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
      <form className='w-80 shadow' onSubmit={(e)=> handleSubmit(e)}>
        <h1>Register</h1>
        <div>
          <input type="text" placeholder="Name" name="name" onChange={(e)=> handleChange(e)} />
        </div>
        <div>
          <input type="email" placeholder="Email" name="email" onChange={(e)=> handleChange(e)} />
        </div>
        <div>
          <input type="password" placeholder="password" name="password" onChange={(e)=> handleChange(e)} />
        </div>
        <div>
          <button type="submit">Register</button>
          
        </div>
        <span>Already register ? <Link to="/login">Login</Link></span>
      </form>
    </>
  );
};

export default Register;
