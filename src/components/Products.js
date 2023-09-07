import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Products = () => {
  const products = useSelector((store) => store.allProducts);
  const receiptRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [enterPressed, setEnterPressed] = useState(false);

  const handleItemClick = (item) => {
    if (!enterPressed && !selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    } else {
      alert(`${item} already exists in the receipt`);
    }
    setEnterPressed(false);
  };

  const handleItemKeyPress = (item, event) => {
    if (event.key === 'Enter') {
      setEnterPressed(true);
      handleItemClick(item);
    }
  };

  const handlePrint = () => {
    const printContents = selectedItems.map((item) => `<li>${item}</li>`).join('');
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = `<ul>${printContents}</ul>`;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div className="products-container">
      <ul className="list-all-products">
        {products.products.map((item) => (
          <button
            key={item}
            className="product"
            type="button"
            onClick={() => handleItemClick(item)}
            onKeyPress={(e) => handleItemKeyPress(item, e)}
            tabIndex={0}
          >
            {item}
          </button>
        ))}
      </ul>
      <div className="receipt-area" id="receipt-area" ref={receiptRef}>
        <p>Receipt area</p>
        <ul>
          {selectedItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button type="button" onClick={handlePrint}>
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default Products;
