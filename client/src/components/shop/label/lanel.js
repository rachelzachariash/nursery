import './label.css';
import React from 'react';

function Label(props) {
   const {type, placeholder, field, value,errorMessage, onChangeFn} = props;//gets the value as props
   let errorMessageforThis="הפרטי " + placeholder +"שגויים "
   return (
       <p>
           <label className="labeltext">
         <input className="textBox" type={type} value={value} placeholder={placeholder} //required
               name={field} onChange={(e) => onChangeFn(field, e)}/>
                <div className="error-message">{!errorMessage ? errorMessageforThis:""}</div>
               <div className="error-message">{errorMessage!='This field is required' || errorMessage==true || errorMessage==false? "" :"שדה זה חובה"}</div>
            {/* if there is an input that not good epual false print otherwise do not print anything */}
         </label>
      </p>
   )
}

export default Label;