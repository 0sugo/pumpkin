import { NavLink } from 'react-router-dom';
import logo from '../images/pumpkin.svg';
import logout from '../images/log-out-outline.svg';
import home from '../images/home-outline.svg';
import linker from '../images/link-outline.svg';
qwe
const Navbar = () => (
  <div className="main-nav flex items-center justify-between mx-32 text-[#EB5757]">
    <img src={logo} alt="logo" className="logo bg-inherit" width="80px" height="80px" />
    <div className="mini-navbar text-xl flex">
      <NavLink to="/Stock" className="mx-4 flex items-center gap-1">
        Outstanding
        <span><img src={linker} alt="link payment" className="h-6" /></span>
      </NavLink>

      <NavLink to="/" className="mx-4 flex items-center gap-1">
        Home
        <span><img src={home} alt="home" className="h-6" /></span>
      </NavLink>
      <NavLink to="/" className="mx-4 flex items-center gap-1">
        Logout
        <span><img src={logout} alt="logout" className="h-6" /></span>
      </NavLink>
      {/* <NavLink to="/Order">Order</NavLink> */}
    </div>
  </div>
);

export default Navbar;
