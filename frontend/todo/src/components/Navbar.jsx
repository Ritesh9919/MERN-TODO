
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ()=> {
const navigate = useNavigate();
const handleLogout = ()=> {
  localStorage.removeItem('accessToken');
  navigate('/login');

}

    return (
        <>
        <div>
          <div>
            <Link to="/">Todo</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        </>
    )
}


export default Navbar;