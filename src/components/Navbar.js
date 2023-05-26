import { NavLink } from "react-router-dom";
import logo from '../images/pumpkin.png';
const Navbar = () => {
  return (
    <div className='main-nav'>
        <img src={logo} className="logo" />
        <div className="mini-navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Stock">Stock</NavLink>
          <NavLink to="/Order">Order</NavLink>
        </div>
    </div>
  )
}

export default Navbar