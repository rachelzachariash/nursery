import React from "react";
import { useState, useEffect } from "react";
import r1 from "../../../picture/r1.png";
import r2 from "../../../picture/r2.png";
import r3 from "../../../picture/r3.png";
import Cart from "../cart/cart";
import { BiShekel } from "react-icons/bi";
import "./shop.css";
import { IoCart } from "react-icons/io5";


function Sope() {
    const [flowes, setFlowes] = useState([]);
    const [fertilizer, setFertilizer] = useState([]);
    const [tools, setTools] = useState([]);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState(0);
    const [cart, setCart] = useState([]);
    const [notEnough, setNotEnough] = useState(false);
    let src = "";
    useEffect(() => {
        fetch("http://localhost:3000/shop/tools")
            .then(res => res.json())
            .then(res => {setTools(res) })
            .catch(err => console.error(err))
            console.log(tools)
            fetch("http://localhost:3000/shop/flowers")
            .then(res => res.json())
            .then(res => {setFlowes(res) })
            .catch(err => console.error(err))
            console.log(flowes)
            fetch("http://localhost:3000/shop/fertilizers")
            .then(res => res.json())
            .then(res => {setFertilizer(res) })
            .catch(err => console.error(err))
            console.log(fertilizer)
    },[])
    const listOfItem = [tools, flowes, fertilizer];
    console.log(listOfItem)


    
    function typeFlowes() {
        setCategory(1);
    }
    function typeGrass() {
        setCategory(2);
    }
    function typeTools() {
        setCategory(3);
    }
    function findIndex(name) {
        let numOfSelectItem = -1;
        for (let index = 0; index < listOfItem.length; index++) {
            if (listOfItem[index].name == name) {
                numOfSelectItem = index;
            }
        }
        return numOfSelectItem;
    }

    function backToCategory() {
        setCategory(0);
    }

    function getError(quantityStockIfBuying, item) {
        if (item.unitsInStock == 0) {
            item.error = "אזל מהמלאי";
            setNotEnough(true);
        } else {
            item.error = "אין מספיק במלאי הוזמן: " + item.unitsInStock;
            getinput2(item, item.unitsInStock);
            setNotEnough(true);
        }
    }

    function getinput2(item, amount) {
        if (amount == 0) {
            return;
        }
        let newCart = cart;
        const objectSelcted = cart.find((_item) => _item.name == item.name);
        const index = findIndex(item);
        item.amoutYouWantToBuy = amount;

        if (objectSelcted) {
            newCart = newCart.filter((_item) => _item.name !== item.name);
        }
        newCart.push(item);
        setCart(newCart);
        let newPrice = 0;
        for (let index = 0; index < cart.length; index++) {
            newPrice += cart[index].price * cart[index].amoutYouWantToBuy;
        }
        setPrice(newPrice);

    }

    function getinput(item, amount) {
        if (amount == 0) {
            return;
        }
        let newCart = cart;
        const objectSelcted = cart.find((_item) => _item.name == item.name);
        const index = findIndex(item);
        item.amoutYouWantToBuy = amount;
        const quantityStockIfBuying =
            item.unitsInStock - item.amoutYouWantToBuy;
        if (quantityStockIfBuying < 0) {
            getError(quantityStockIfBuying, item);
        } else {
            if (objectSelcted) {
                newCart = newCart.filter((_item) => _item.name !== item.name);
            }
            item.error = ""
            setNotEnough(false);
            newCart.push(item);
            setCart(newCart);
            let newPrice = 0;
            for (let index = 0; index < cart.length; index++) {
                newPrice += cart[index].price * cart[index].amoutYouWantToBuy;
            }
            setPrice(newPrice);
        }
    }

    return (
        <div>
            {category != 0 && (
                <button className="returnto" onClick={backToCategory}>חזרה לתפריט הראשי</button>
            )}
            {category === 0 && (
                <h1 className="typehed">בחר את הקטגוריה הרצויה לך:</h1>
            )}
            <Cart
                listOfItem={listOfItem}
                price={price}
                cart={cart}
                setCart={setCart}
                setPrice={setPrice}
            ></Cart>
            <div className="shopcatdiv">
                {category == 0 && (
                    <div className="shoptype">
                        <button className="btn" onClick={typeFlowes}>
                            <img className="imgtype" src={r1}></img>
                            <p className="ptype">כלי גינון</p>
                        </button> </div>
                )}


                {category == 0 && (
                    <div className="shoptype">
                        <button className="btn" onClick={typeGrass}>
                            <img className="imgtype" src={r3}></img>
                            <p className="ptype">צמחי גינה </p>
                        </button>
                    </div>
                )}
                {category == 0 &&
                    (<div className="shoptype">
                        <button className="btn" onClick={typeTools}>
                            <img className="imgtype" src={r2}></img>
                            <p className="ptype">חומרי דישון</p>
                        </button>
                    </div>
                    )}
            </div>
            <div className="allprodiv">
                {category != 0 &&
                    listOfItem[category - 1].map((itemInList) => (
                        <ShowProduct
                            getinput={getinput}
                            itemInList={itemInList}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Sope;

function ShowProduct(props) {
    const itemInList = props.itemInList;
    const [amount, setAmount] = useState(0);
    return (
        <>
            <div className="prodiv">
                <p className="pnamepro">{itemInList.name}</p>
                <img alt="" src={itemInList.picture}></img>
               
                {itemInList.error != "" && <p className="notonof">{itemInList.error}</p>}
                <h3 className="pricepro">
                    <BiShekel />
                    {itemInList.price}
                </h3>
                <input
                    className="amountpro"
                    type="number"
                    min="1"
                    placeholder="כמות"
                    onChange={(event) => setAmount(event.target.value)}
                ></input>
                <button
                    className="addtocartpro"
                    onClick={() => props.getinput(itemInList, amount)}
                >
                    <p className="addppro">  הוסף לעגלה  </p> < IoCart />
                </button>

            </div>
        </>
    );
}

