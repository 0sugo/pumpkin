/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import beer from '../images/beer-outline.svg';
import pint from '../images/pint-outline.svg';
import wine from '../images/wine-outline.svg';
import restaurant from '../images/restaurant-outline.svg';
import print from '../images/print-outline.svg';
import cart from '../images/cart-outline.svg';
import add from '../images/add-circle-outline.svg';
import subtract from '../images/remove-circle-outline.svg';
import close from '../images/close-circle-outline.svg';

import { fetchAllProducts } from '../redux/Products/productsSlice';

const Products = () => {
  const products = useSelector((store) => store.allProducts);
  const receiptRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [enterPressed, setEnterPressed] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [setName, Name]=useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const updateQuantity = (name, quantity) => {
    const updatedItems = selectedItems.map((item) => {
      if (item.name === name) {
        const newQuantity = Math.max(1, quantity);
        return { ...item, quantity };
      }
      return item;
    });
    setSelectedItems(updatedItems);
  };

  const handleItemClick = (item) => {
    if (!enterPressed) {
      const existingItem = selectedItems.find(
        (selectedItem) => selectedItem.name === item.name,
      );

      if (existingItem) {
        updateQuantity(item.name, existingItem.quantity + 1);
      } else {
        setSelectedItems([
          ...selectedItems,
          { name: item.name, price: item.price, quantity: 1 },
        ]);
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
            ${selectedItems
    .map(
      (item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td>Ksh ${item.price * item.quantity }</td>
              </tr>
            `,
    )
    .join('')}
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

    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.open();

    printWindow.document.write(printContents);
    printWindow.document.close();

    printWindow.print();

    printWindow.onafterprint = () => {
      printWindow.close();
      setIsPrinting(false);
    };
  };

  const verifyName = (e)=>{
    const name =e.target.value;
  }

  function calculateTotal(selectedItems) {
    let total = 0;
    for (const item of selectedItems) {
      total += item.price * item.quantity;
    }
    return total.toLocaleString();
  }

  const removeItem = (name) => {
    const updatedItems = selectedItems.filter((item) => item.name !== name);
    setSelectedItems(updatedItems);
  };

  return (
    <div className="products-container flex flex-row px-4 gap-4 text-white relative">
      <div className="receipt-area hide-scrollbar rounded-2xl basis-1/2 bg-[#252A3C] p-4 max-h-screen overflow-y-scroll overflow-x-hidden bg-scroll"
        id="receipt-area"
        ref={receiptRef}
      >
        <p className="text-center">RECEIPT AREA</p>
        <form>
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">Customer name :</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-insert  sm:max-w-md">
              <input type="text" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="customer name" onChange={verifyName}/>
            </div>
          </div>
          </div>
        </form>

        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th className="w-2/5 py-4 text-start">Item</th>
              <th className="w-1/5 text-center">Qty</th>
              <th className="w-1/5 text-center">Price</th>
              <th className="w-1/5 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-[#1B1F2C]' : 'bg-inherit'}
              >
                <td className="px-2">
                  <div className="flex items-center">
                    <span className="w-8 h-8 cursor-pointer" onClick={() => { removeItem(item.name); }}>
                      <img
                        src={close}
                        alt="remover"
                        width="25px"
                        height="25px"
                      />
                    </span>
                    <span className="flex-grow">{item.name}</span>
                  </div>
                </td>
                <td className="flex justify-between items-center">
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8"
                  >
                    <img
                      src={subtract}
                      alt="subtract"
                      width="25px"
                      height="25px"
                    />
                  </button>
                  <span className="m-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    className="w-8 h-8"
                  >
                    <img src={add} alt="add" width="25px" height="25px" />
                  </button>
                </td>
                <td className="w-1/5 text-center">{item.price}</td>
                <td className="w-1/5 text-center">
                  Ksh
                  {' '}
                  {item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr className="bg-white w-full" />
        <div className="flex justify-center ">
          <h3>
            Total :
            <span>
              {' '}
              {calculateTotal(selectedItems)}
            </span>
          </h3>
        </div>

        <div className="flex">
          <button
            type="button"
            className="bg-[#EB5757] p-4 m-10 rounded-lg mx-auto sticky flex gap-1"
            onClick={openPrintWindow}
            disabled={isPrinting || selectedItems.length === 0}
          >
            PRINT RECEIPT
            <span>
              <img src={print} className="h-6" />
            </span>
          </button>
        </div>
      </div>
      <div className="list-all-products ">
        <div className="flex justify-center gap-4 items-center overflow-hidden">
          <div className="flex flex-col items-center gap-1">
            <img src={beer} alt="Beers" width="100px" height="100px" />
            <p>Beers</p>
          </div>

          <div className="flex flex-col items-center">
            <img src={pint} alt="pint" width="100px" height="100px" />
            <p>Liqour</p>
          </div>

          <div className="flex flex-col items-center">
            <img src={wine} alt="Wines" width="100px" height="100px" />
            <p>Wine</p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={restaurant}
              alt="Restaurant"
              width="100px"
              height="100px"
            />
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
