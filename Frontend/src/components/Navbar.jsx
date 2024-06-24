import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "../assets/logo.png";
import incognito from "../assets/incognito.png";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const cookieUsername = Cookies.get("username");
    if (cookieUsername) {
      setUsername(cookieUsername);
    }
  }, []);
  const handleLogout = () => {
    console.log("Logging out...");
    Cookies.remove("username");
    setUsername(null);
    navigate("/");
  };
  
  const handleIncognito = () => {
    Cookies.set("username", "Anonymous");
    setUsername("Anonymous");
    navigate("/explore");
  };

  return (
    <div className='flex flex-row justify-between h-16 items-center px-64 md:px-40 bg-slate-100'>
      <img src={Logo} alt="Logo" className="w-12" />
      <div className='flex flex-row gap-x-10'>
        <p className="">Home</p>
        <p className="">About Us</p>
        {username && username !== "Anonymous" && <p onClick={()=>navigate("/explore")}>Explore</p>}
        <p className="">FAQ</p>
      </div>
      <div className='flex flex-row gap-x-10 items-center'>
        <img src={incognito} alt="Incognito" className="h-10 w-10 cursor-pointer" onClick={handleIncognito} />
        {username && username !== "Anonymous" ? (
          <>
            <div>{username}</div>
            <div className='h-10 w-32 flex items-center justify-center bg-red-600 text-white rounded cursor-pointer' onClick={handleLogout}>Logout</div>
          </>
        ) : (
          <>
            <div onClick={() => { navigate("/login") }}>Login</div>
            <div className='h-10 w-32 flex items-center justify-center bg-lime-600 text-white rounded cursor-pointer' onClick={() => { navigate("/signup") }}>Signup</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
