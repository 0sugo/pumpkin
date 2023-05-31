import { NavLink } from 'react-router-dom';

const Home = () => (
  <div className="home-links">
    <NavLink to="/Order" className="links">ORDER DRINKS</NavLink>
    <NavLink to="/Stock" className="links">STOCK-TAKE</NavLink>
    <NavLink to="/Butchery" className="links">BUTCHERY</NavLink>
  </div>
);

export default Home;
