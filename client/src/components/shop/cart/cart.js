import React from 'react';
import './cart.css'
import { Link } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import { BsTrashFill } from "react-icons/bs";

function Cart(props) {
    const { price, cart, setCart, setPrice, listOfItem } = props;
    let price1 = "סכום לתשלום: " + price;

    function removeItem(item) {
        let newPrice = price - (item.price * item.amoutYouWantToBuy);
        item.error='';
        listOfItem.forEach(_item => { if (_item.name == item.name) _item.amoutYouWantToBuy = 0 });
        setPrice(newPrice);
        setCart(cart.filter(_item => _item.name != item.name));
    }

    
    function littelCart(cart){
        let littelCart=[];
        for (let index = 1; index < 5; index++) {
            const element = cart[cart.length-index];
            littelCart.push(element);
        }
        return littelCart;
    }

    return (
        <div className="cart">
            <div className="cart1">
            <h1 className="hedcart"><IoCartOutline/> העגלה שלך</h1>
            <p>{!price ? 'העגלה שלך ריקה' : price1}</p>

                  {cart && cart.map(item =>
                <div className="proincart">
                    <p className="iname">{item.amoutYouWantToBuy == 0 ? '' : item.name }</p>
                    <p className="iamount">{item.amoutYouWantToBuy == 0 ? '' :"כמות: " + item.amoutYouWantToBuy }</p>
                    <button type="button" className="itrash" onClick={() => removeItem(item)} ><BsTrashFill/></button>
                </div>
            )}
            {price ? <div>
                <Link exact to={{ pathname: "/payment", state: { cart: cart } }}>
                    <li className="lipaycart">לתשלום</li>
                </Link> </div> : ""}
                </div>
        </div>
    
    );

}
export default Cart;

