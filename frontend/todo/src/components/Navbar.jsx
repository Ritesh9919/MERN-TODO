import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <>
      <div class="bg-purple-700 h-[65px] flex justify-between px-5 items-center">
        <div>
          <Link class="text-xl font-bold text-white" to="/">Todo</Link>
        </div>
        <div class=" flex gap-5 text-lg text-white">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
