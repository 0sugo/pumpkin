import { Route, Routes } from 'react-router-dom';
import Stock from './components/Stock';
import Order from './components/Order';
import Home from './components/Home';
import Butchery from './components/Butchery';
qwertyuiop
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Stock" element={<Stock />} />
        <Route path="Order" element={<Order />} />
        <Route path="Butchery" element={<Butchery />} />
      </Routes>

    </div>
  );
}

export default App;
