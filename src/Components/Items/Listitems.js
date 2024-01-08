import { useContext } from "react";
import Context from "../Store/AuthContext";

const Listitems = ()=>{
  let ctx =   useContext(Context);
  console.log(ctx.listitems);
    return <>
     {
        ctx.listitems.map((items)=>{
           return <li>
            <div>{items.description}</div>
            <div>{items.amount}</div>
            <div>{items.option}</div>
           </li>
        })
     }
    </>
}
export default Listitems;