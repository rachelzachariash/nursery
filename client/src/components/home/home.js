import React from "react";


import home from "../../picture/home.jpg";
import "./home.css";
import { Link } from "react-router-dom";
import { AiOutlineDoubleLeft } from "react-icons/ai";


const Home = () => {
    return (
        <div className="image" style = {{ backgroundImage: "url(" + home + ")" }}>
            <div className="text">
                <p className="abo"></p>
            </div>

            <Link
                to="/shop"
                className="LoginStart"
                style={{ textDecoration: "none" }}
            >
                בואו לגלות עולם קסום של פריחה
                <AiOutlineDoubleLeft />
            </Link>
        </div>
    );
};

export default Home;
