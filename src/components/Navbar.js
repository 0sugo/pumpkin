import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='Navbar'>
        <NavLink to="/">Stocks</NavLink>
        <NavLink to="/Order">Order</NavLink>
    </div>
  )
}

export default Navbar