import React from "react";

export default function Product(props) {
  const { url, name, latinName, price, description, addtocart } = props;

  const handleAddToCart = () => {
    addtocart({
      name: name,
      latinName: latinName,
      imageUrl: url,
      price: price,
      description: description
    });
  };

  return (
    <div className="card">
        <div className="image-cont"> 

      <img className="product--image" src={url} alt="product image" />
        </div>
      <p className="product-name">{name}</p>
      <p className="latin-name">({latinName})</p>
      <p className="price">{price}€</p>
      <p className="description">{description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
