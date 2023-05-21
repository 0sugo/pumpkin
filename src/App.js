import { Route, Routes } from "react-router-dom";
import Stock from "./components/Stock";
import Order from "./components/Order";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Stock />}/>
        <Route path="Order" element={<Order />}/>
      </Routes>

    </div>
  );
}

export default App;
