import React from 'react'
import { useSelector } from 'react-redux'

const Products = () => {
const products = useSelector((store)=> store.allProducts)
console.log( products)
    return (
    <div>
        <ul>    
            {products.products.map((item)=>{
                return <li key={item}>{item}</li>
                // console.log(item);
            })}
        </ul>
    </div>
  )
}

export default Products