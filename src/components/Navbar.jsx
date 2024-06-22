import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to="/" className="flex items-center justify-center w-10 h-10 font-bold bg-white rounded-lg shadow-md">
        <p className="green-gradient_text">SB</p>
      </NavLink>
      <nav className='flex text-lg font-medium gap-7'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-green-800" : "text-black" }>
          About
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? "text-green-800" : "text-black"}>
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;