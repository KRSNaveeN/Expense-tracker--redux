import { useContext, useRef, useState } from "react";
import Context from "../Store/AuthContext";

const Additems = ()=>{
  
   const ctx = useContext(Context);
  

    return <>
      <form onSubmit={ctx.submitHandle}>
        <div>
            <label>Amout spent</label>
            <input ref={ctx.amount} type='number' required/>
        </div>

        <div>
            <label>Item description</label>
            <input ref={ctx.description} type='text' required/>
        </div>

        <div>
            <select ref={ctx.option}>
                <option>Food</option>
                <option>Petrol</option>
                <option>Movies</option>
                <option>Recreation</option>
            </select>
        </div>
        <button>Add Expense</button>
      </form>
    </>
}

export default Additems;