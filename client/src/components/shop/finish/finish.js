import React from 'react';
import { Link } from 'react-router-dom';
import './finish.css'

function Finish() {
    return (

        <div className="allmes">
            <h1 className="putton">תודה רבה!</h1>
            <p className="p1">אנו שמחים שקנית אצלינו!</p>
            <p className="p2">התשלום התקבל בהצלחה!</p>
            <Link className="puttonHome" exact to="/">
                חזרה לדף הבית
        </Link> </div>

    );
}
export default Finish;