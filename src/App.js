import { Route, Routes } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import '@fontsource/poppins';
import Stock from './components/Stock';
import Order from './components/Order';
import Home from './components/Home';
import Butchery from './components/Butchery';

function App() {
  return (
    <div className="App bg-[#1B1F2C]">
      <NextUIProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Stock" element={<Stock />} />
          <Route path="Order" element={<Order />} />
          <Route path="Butchery" element={<Butchery />} />
        </Routes>
      </NextUIProvider>
    </div>
  );
}

export default App;
