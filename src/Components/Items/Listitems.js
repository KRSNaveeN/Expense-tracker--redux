import { useContext } from "react";
import Context from "../Store/AuthContext";
import classes from './Listitems.module.css';
import Table from 'react-bootstrap/Table';

const Listitems = ()=>{
  let ctx =   useContext(Context);
  console.log(ctx.listitems);
    return <div className={classes.listitems}> 
        <Table>
            <thead>
                <tr>
                    <td>Descripton</td>
                    <td>Amount</td>
                    <td>Option</td>
                </tr>
            </thead>
            <tbody >
              {
                ctx.listitems.map((items)=>{
                return <tr>
                        <td>{items.description}</td>
                        <td>{items.amount}</td>
                        <td>{items.option}</td>
                      </tr>
                 })
             }
            </tbody>
        </Table>
        </div>
}
export default Listitems;

