import { useState, useEffect } from "react";
import Label from "../label/lanel";
import { BiShekel } from "react-icons/bi";
import emailjs from 'emailjs-com';
import {
    checkCreditThreeNumBackCrad,
    checkCreditDate,
    checkCreditNumber,
    checksEmail,
    checkName,
    checkpfone,
    checksID,
    checkingAddress,
} from "./validation";
import { Link, withRouter, useLocation } from "react-router-dom";
import "./payment.css";
import { SendRounded } from "@material-ui/icons";



export default withRouter(function Payment(props) {
    //here I update what state there is
    const detailsSend = { name: "", address: "", email: "", price: "" };
    const orderDetails = { prudeucs: [], costumerDetails: {}, creditDetails: {} }
    const creditDetails = { CreditNumber: "", CreditData: "", CreditThreeNum: "" }
    const costumerDetails = { name: "", phone: "", id: "", email: "", address: "" }
    const [flowes, setFlowes] = useState([]);
    const [fertilizer, setFertilizer] = useState([]);
    const [tools, setTools] = useState([]);
    const { history } = props;
    const location = useLocation();
    const listItem = location.state.cart;
    const [items, setItems] = useState({ "flowes": [], "tools": [], "fertilizer": [] })
    const [state, setState] = useState({
        name: "",
        id: "",
        phone: "",
        email: "",
        CreditNumber: "",
        CreditData: "",
        CreditThreeNum: "",
        address: "",
        city: "",
        allInputAreGood: "",
        errors: {
            name: "true",
            id: "true",
            phone: "true",
            email: "true",
            CreditNumber: "true",
            CreditData: "true",
            CreditThreeNum: "true",
            address: "true",
            city: "true",
        },
    });


    useEffect(() => {
        fetch("http://localhost:3000/shop/tools")
            .then(res => res.json())
            .then(res => { setTools(res) })
            .catch(err => console.error(err))
        console.log(tools)
        fetch("http://localhost:3000/shop/flowers")
            .then(res => res.json())
            .then(res => { setFlowes(res) })
            .catch(err => console.error(err))
        console.log(flowes)
        fetch("http://localhost:3000/shop/fertilizers")
            .then(res => res.json())
            .then(res => { setFertilizer(res) })
            .catch(err => console.error(err))
        console.log(fertilizer)
        setItems({ "flowes": flowes, "tools": tools, "fertilizer": fertilizer });
    }, [])
    const finishShoping = () => {
        listItem?.forEach((item, index) => {
            let amount;
            debugger
            items[item.category].forEach(prod => { if (prod.id == item.id) amount = prod.amount })
            let newItem = {
                id: item._id,
                category: item.category,
                name: item.name,
                picture: item.picture,
                price: item.price,
                amoutYouWantToBuy: 0,
                unitsInStock: item.unitsInStock - item.amoutYouWantToBuy,
                error: ""
            }
            fetch(`http://localhost:3000/shop/${item.category}/${item._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            })
        })
    }


    function allTrue() {
        finishShoping()
        let products = [];

        debugger
        listItem?.map((item) => {
            const product = { name: "", amount: 0 };
            product.name = item.name;
            product.amount = item.amoutYouWantToBuy
            products.push(product);
        })
        costumerDetails.name = state.name;
        costumerDetails.id = state.id;
        costumerDetails.address = state.address;
        costumerDetails.email = state.email;
        costumerDetails.phone = state.phone;
        creditDetails.CreditNumber = state.CreditNumber;
        creditDetails.CreditData = state.CreditData
        creditDetails.CreditThreeNum = state.CreditThreeNum;
        orderDetails.prudeucs = products;
        orderDetails.costumerDetails = costumerDetails;
        orderDetails.creditDetails = creditDetails;
        detailsSend.name = state.name;
        detailsSend.address = state.address;
        detailsSend.email = state.email;
        let price1 = checkPrice(newPrice);
        detailsSend.price = price1;
        debugger
        sendEmail(detailsSend);
        saveOrder(orderDetails);
        setState({ ...state, allInputAreGood: true });
    }

    function getInput(field, event) {
        setState({ ...state, [field]: event.target.value });
    }

    const sendEmail = async (date) => {
        await fetch("http://localhost:3000/bought", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(date),
        });
    };
    const saveOrder = async (date) => {
        await fetch("http://localhost:3000/savebought", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(date),
        });
    };

    function validate(event) {
        //this function sends for testing all the inputs
        const {
            name,
            id,
            phone,
            email,
            CreditNumber,
            CreditData,
            CreditThreeNum,
            address,
        } = state;
        const errors = {
            //new poject
            name: "",
            id: "",
            phone: "",
            email: "",
            CreditNumber: "",
            CreditData: "",
            CreditThreeNum: "",
            address: "",
        };
        errors.id = checksID(id); //put in the erros the results of the checks
        errors.email = checksEmail(email);
        errors.phone = checkpfone(phone);
        errors.name = checkName(name);
        errors.CreditThreeNum = checkCreditThreeNumBackCrad(CreditThreeNum);
        errors.CreditData = checkCreditDate(CreditData);
        errors.CreditNumber = checkCreditNumber(CreditNumber);
        errors.address = checkingAddress(address);
        setState({ ...state, errors: errors }); //puts the results in the state
        if (
            errors.email == true &&
            errors.CreditNumber == true &&
            errors.CreditData == true && //Checks if all the tests came out good
            errors.CreditThreeNum == true &&
            errors.name == true &&
            errors.phone == true &&
            errors.id == true &&
            errors.address == true
        ) {
            allTrue();

        }

        event.preventDefault(); //do that it wall not start from the bigning
    }
    function checkPrice(newPrice) {
        for (let index = 0; index < listItem.length; index++) {
            newPrice +=
                listItem[index].price * listItem[index].amoutYouWantToBuy;
        }
        return newPrice;
    }
    let newPrice = 0;
    let price;

    return (
        <div className="all">
            <h3 className="pricetopay">
                סכום לתשלום: {(price = checkPrice(newPrice))}<BiShekel />
            </h3>
            {state.allInputAreGood == true && history.push("/finish")}
            <div className="detailsDonation" >
                {/* onSubmit= {(e) => validate(e)}*/}
                <Label
                    className="a"
                    type="text"
                    placeholder={"שם"}
                    field="name" //sent to the component
                    onChangeFn={getInput}
                    errorMessage={state.errors.name}
                    value={state.name}
                ></Label>

                <Label
                    type="text"
                    placeholder={"תעודת זהות"}
                    field="id"
                    onChangeFn={getInput}
                    errorMessage={state.errors.id}
                    value={state.id}
                ></Label>

                <Label
                    type="text"
                    placeholder={"טלפון"}
                    field="phone"
                    onChangeFn={getInput}
                    errorMessage={state.errors.phone}
                    value={state.phone}
                ></Label>

                <Label
                    type="email"
                    placeholder={"מייל"}
                    field="email"
                    onChangeFn={getInput}
                    errorMessage={state.errors.email}
                    value={state.email}
                ></Label>

                <Label
                    type="text"
                    placeholder={"מספר כרטיס אשראי"}
                    field="CreditNumber"
                    onChangeFn={getInput}
                    errorMessage={state.errors.CreditNumber}
                    value={state.CreditNumber}
                ></Label>

                <Label
                    type="text"
                    placeholder={"תוקף"}
                    field="CreditData"
                    onChangeFn={getInput}
                    errorMessage={state.errors.CreditData}
                    value={state.CreditData}
                ></Label>

                <Label
                    type="text"
                    placeholder={"3 ספרות בגב הכרטיס"}
                    field="CreditThreeNum"
                    onChangeFn={getInput}
                    errorMessage={state.errors.CreditThreeNum}
                    value={state.CreditThreeNum}
                ></Label>

                <Label
                    type="text"
                    placeholder={"כתובת"}
                    field="address"
                    onChangeFn={getInput}
                    errorMessage={state.errors.address}
                    value={state.address}
                ></Label>
                <button id="sumbitButton"
                    className="bottenpay" onClick={(e) => validate(e)}>לתשלום</button>
            </div>
        </div>
    );
});
