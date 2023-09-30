/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  beer from '../images/beer-outline.svg';
import pint from '../images/pint-outline.svg';
import wine from '../images/wine-outline.svg';
import restaurant from '../images/restaurant-outline.svg';
import print from '../images/print-outline.svg';
import cart from '../images/cart-outline.svg';
import { fetchAllProducts } from '../redux/Products/productsSlice';

const Products = () => {
  const products = useSelector((store) => store.allProducts);
  const receiptRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [enterPressed, setEnterPressed] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAllProducts());
  },[dispatch]);

  const updateQuantity = (name, quantity) => {
    const updatedItems = selectedItems.map((item) => {
      if (item.name === name) {
        return { ...item, quantity };
      }
      return item;
    });
    setSelectedItems(updatedItems);
  };

  const handleItemClick = (item) => {
    if (!enterPressed) {
      const existingItem = selectedItems.find((selectedItem) => selectedItem.name === item.name);

      if (existingItem) {
        updateQuantity(item.name, existingItem.quantity + 1);
      } else {
        setSelectedItems([...selectedItems, { name: item.name, price: item.price, quantity: 1 }]);
      }
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
    // const printContents = selectedItems.map((item) => `<li>${item}</li>`).join('');
    const printContents = `
    <html>
      <head>
        <title>Receipt</title>
        <style>
          .top {
            text-align: center
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          table, th, td {
            border: 1px solid black;
          }

          th, td {
            padding: 8px;
            text-align: left;
          }

          .divider {
            border-top: 2px solid black;
            margin-top: 16px;
            margin-bottom: 16px;
          }

          .footer {
            text-align: center;
            margin-top: 16px;
          }

          .total {
            font-size: 28px;
            font-weight: bold;
            text-align:center;
          }

          .buy-goods {
            font-size: 20px;
            font-weight:bold;
          }
        </style>
      </head>
      <body>
        <h1 class="top">Pumpkin Bar & Restaurant</h1>
        <p>Chokaa, Kangundo Road</p>
        <p>Tel: 07123456789</p>
        <p>Email: pumpkinbar@gmail.com</p>
        <div class="divider"></div>
        <p>Table: 01</p>
        <p>Receipt No: Xdrtghe737</p>
        <div class="divider"></div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${selectedItems.map((item) => `
              <tr>
                <td>${item}</td>
                <td>1</td>
                <td>Ksh 10</td>
                <td>Ksh 10</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p>V.A.T: 16%</p>
        <div class="divider"></div>
        <div class="total">
          <p>Total: Kshs ${calculateTotal(selectedItems)}</p>
        </div>
        <div class="divider"></div>
        <div class="footer">
          <p class="buy-goods">BUY GOODS TILL NO: [8597614]</p>
          <p>Served by: [Jose]</p>
        </div>
      </body>
    </html>
  `;

// Function to calculate the total amount based on selected items
function calculateTotal(selectedItems) {
  // You can calculate the total amount based on the selected items here
  // Replace this with your calculation logic
  return "100"; // Example total amount
}



    // Open a new print window or create an iframe
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.open();
    // printWindow.document.write(`<html><head><title>Receipt</title></head><body><ul>${printContents}</ul></body></html>`);
    printWindow.document.write(printContents);
    printWindow.document.close();

    printWindow.print();

    // Close the print window or remove the iframe after printing
    printWindow.onafterprint = () => {
      printWindow.close();
      setIsPrinting(false);
    };
  };

  return (
    <div className="products-container flex flex-row px-4 gap-4 text-white relative">
      <div className="receipt-area hide-scrollbar rounded-2xl basis-1/2 bg-[#252A3C] p-4 max-h-screen overflow-y-scroll overflow-x-hidden bg-scroll" id="receipt-area" ref={receiptRef}>
        <p className='text-center'>RECEIPT AREA</p>
        <table className="w-full table-fixed">
  <thead>
    <tr>
      <th className="text-start py-4">Item</th>
      <th className="text-center">Qty</th>
      <th className="text-center">Price</th>
      <th className="text-center">Amount</th>
    </tr>
  </thead>
  <tbody>
    {selectedItems.map((item, index) => (
      <tr key={index} className={index % 2===0? 'bg-[#1B1F2C]' :'bg-inherit'}>
        <td className="text-start p-2">{item.name}</td>
        <td className="text-center py-4">
          <button onClick={() => updateQuantity(item.name, item.quantity - 1)}>-</button>
          <span className="m-5">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
        </td>
        <td className="text-center py-4">{item.price}</td>
        <td className="text-center py-4">Ksh {item.price * item.quantity}</td>
      </tr>
    ))}
  </tbody>
</table>


        <div className='flex'>
        <button
          type="button"
          className="bg-[#EB5757] p-4 m-10 rounded-lg mx-auto sticky flex gap-1"
          onClick={openPrintWindow}
          disabled={isPrinting || selectedItems.length === 0}
        >
          PRINT RECEIPT
          <span><img src={print} className='h-6'/></span>
        </button>
        </div>
      </div>
        <div className='list-all-products '>
          <div className='flex justify-center gap-4 items-center overflow-hidden'>
            <div className='flex flex-col items-center gap-1'>
              <img src={beer} alt='Beers' width="100px" height="100px" />
              <p>Beers</p>
            </div>

            <div className='flex flex-col items-center'>
            <img src={pint} alt='pint' width="100px" height="100px" />
            <p>Liqour</p>
            </div>

            <div className='flex flex-col items-center'>
              <img src={wine} alt='Wines' width="100px" height="100px" />
              <p>Wine</p>

            </div>

            <div className='flex flex-col items-center'>
              <img src={restaurant} alt='Restaurant' width="100px" height="100px" />
              <p>Restaurant</p>

            </div>

          </div>

          <ul className="grid grid-cols-3 xl:grid-cols-4 xl:basis-3/4 basis-1/2 gap-4 p-3 bg-[#1B1F2C] static">
            {products.products.map((item) => (
              <button
                key={item.id}
                className=" flex flex-wrap items-center justify-around rounded-lg box-border lg:h-16 md:h-20 uppercase bg-[#252A3C] font-semibold"
                type="button"
                onClick={() => handleItemClick(item)}
                onKeyPress={(e) => handleItemKeyPress(item, e)}
                tabIndex={0}
              >
                {item.name}
              </button>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default Products;
