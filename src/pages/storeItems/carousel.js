import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./product";
import { responsive } from "./data"; // You can keep the responsive config from the data file
import './carousel.css'
export default function StoreItems() {
  const [productData, setProductData] = useState([]);
  const [shoppingbag, setShoppingBag] = useState([])
  const [filter, setFilter] = useState('')
  console.log('value',filter)
  console.log('shopping bag',shoppingbag)
  useEffect(() => {
    async function fetchProductData() {
      try {
        let apiUrl = "http://localhost:4000/storeItem";
        
        if (filter !== '') {
          apiUrl = `http://localhost:4000/storeItem?category=${filter}`;
        }
        if(filter === 'plants'){
            apiUrl = "http://localhost:4000/storeItem"
        }
  console.log(apiUrl)
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
  
    fetchProductData();
  }, [filter]);
  
// Inside your frontend component


const addtocart = (item) => {
    setShoppingBag((prevShoppingBag) => {
      const existingItemIndex = prevShoppingBag.findIndex(
        (bagItem) => bagItem.name === item.name
      );
  
      if (existingItemIndex !== -1) {
        // If item already exists, update its quantity
        const updatedShoppingBag = [...prevShoppingBag];
        updatedShoppingBag[existingItemIndex].quantity += 1;
        localStorage.setItem("shoppingBag", JSON.stringify(updatedShoppingBag));
        return updatedShoppingBag;
      } else {
        // If item is new, add it with quantity 1
        const updatedShoppingBag = [...prevShoppingBag, { ...item, quantity: 1 }];
        localStorage.setItem("shoppingBag", JSON.stringify(updatedShoppingBag));
        return updatedShoppingBag;
      }
    });
  };
  
  const handleButtonClick = (event) => {
    setFilter(event.target.value); // Update the filter state with the button value
    console.log("Button clicked:", filter)
  };
  const products = productData.map((item) => (
    <Product
          key={item._id} // Use a unique identifier from the fetched data
          name={item.name}
          latinName={item.latinName}
          url={item.imageUrl} // Adjust the property name for the image URL
          price={item.price}
          description={item.description} 
          addtocart={addtocart}/>
  ));

  return (
    <><br></br><div className="storeItem-main" id="store">
          <h1 className="carusel-title">Indoor Plants</h1>
          <p className="carusel-p">Where do you want to put your plant ?</p>
          <div className="buttons-cont">
              <button value="" onClick={handleButtonClick}>All plants</button>
              <button value="low-light" onClick={handleButtonClick}>In low light spot</button>
              <button value="medium-light" onClick={handleButtonClick}>In medium light spot</button>
              <button value="bright-indirect-light" onClick={handleButtonClick}>In bright indirect light spot</button>
              <button value="bright-light" onClick={handleButtonClick}>In bright light spot</button>

          </div>
          <Carousel className="cards-cont" responsive={responsive}>
              {products}
          </Carousel>
      </div></>
  );
}
