import { NavLink } from "react-router-dom";
import logo from '../images/pumpkin.png';
const Navbar = () => {
  return (
    <div className='Navbar'>
        <img src={logo} />
        <NavLink to="/">Stocks</NavLink>
        <NavLink to="/Order">Order</NavLink>
    </div>
  )
}

export default Navbar