import Header from '../../components/header'
import '../checkout/checkout.css'
const CheckOut = () => {
    let totalSum = 0;
    const sum = () =>{
      const bag = JSON.parse(localStorage.getItem("shoppingBag"))
  for(const item of bag){
      totalSum += item.price;
  
  }
    }
    sum()
    const getShoppingBag = () =>{
        const bag = JSON.parse(localStorage.getItem("shoppingBag")) || [];
        console.log(bag)
        return (
            <ul>
      {bag.map((item, index) => (
        <li className='li-item' key={index}><p>Name:{item.name}</p><p>Quantity: {item.quantity}</p> <p>Price: {item.price}</p>  </li>
      ))}
       <p>Your total:{totalSum.toFixed(2)}</p>
    </ul>
        )
    }
    getShoppingBag()
  return (
    <>
      <Header />
      <div className='checkout-container'>
      <h1>Your Shopping bag</h1>
<ul>
    {getShoppingBag()}
</ul>
      </div>
    </>
  )
}
export default CheckOut
