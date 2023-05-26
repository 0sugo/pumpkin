import { NavLink } from "react-router-dom"

const Home = () => {
  return (
    <div className="home-links">
        <NavLink to="/Order">Order Drinks</NavLink>
        <NavLink to="/Stock">Stock-take</NavLink>
        <NavLink to="/Butchery">Butchery</NavLink>
    </div>
  )
}

export default Home