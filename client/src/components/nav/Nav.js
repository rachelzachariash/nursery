import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import { AiOutlinePhone } from "react-icons/ai";

function Nav() {
  return (
   <nav className="top">
       <ul>   
       <Link className="link" exact to="/">
         <li>דף הבית</li>
        </Link>
        <Link  className="link" exact to="/about">
         <li>מי אנחנו?</li>
        </Link >
        <Link  className="link" exact to="/shop">
         <li>חנות</li>
        </Link>
        <Link  className="link" exact to="/QuestionsAnswers">
         <li>שאלות נפוצות</li>
        </Link>
        <Link  className="link" exact to="/Opinion">
         <li>תגובות</li>
        </Link>
        <p className="name">פרחי הגן - <AiOutlinePhone /> 03-5612525</p>
       </ul>
       
   </nav>
  );
}

export default Nav;