import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Products = () => {
  const products = useSelector((store) => store.allProducts);
  const receiptRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [enterPressed, setEnterPressed] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleItemClick = (item) => {
    if (!enterPressed && !selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setEnterPressed(false);
  };

  const handleItemKeyPress = (item, event) => {
    if (event.key === 'Enter') {
      setEnterPressed(true);
      handleItemClick(item);
    }
  };

  const openPrintWindow = () => {
    const printContents = selectedItems.map((item) => `<li>${item}</li>`).join('');

    // Open a new print window or create an iframe
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.open();
    printWindow.document.write(`<html><head><title>Receipt</title></head><body><ul>${printContents}</ul></body></html>`);
    printWindow.document.close();

    printWindow.print();

    // Close the print window or remove the iframe after printing
    printWindow.onafterprint = () => {
      printWindow.close();
      setIsPrinting(false);
    };
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
        <button
          type="button"
          onClick={openPrintWindow}
          disabled={isPrinting || selectedItems.length === 0}
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default Products;
