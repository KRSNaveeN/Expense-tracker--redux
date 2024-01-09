import { useContext } from "react";
import Context from "../Store/AuthContext";
import classes from './Listitems.module.css';
import Table from 'react-bootstrap/Table';

const Listitems = ()=>{
  let ctx =   useContext(Context);

  const editHandler = async (item)=>{
    ctx.setAmount(item.amount);
    ctx.setDescription(item.description)
    
    let updatedlist = ctx.listitems.filter((x)=>{return x.description != item.description});
    ctx.setListitems(updatedlist);
    console.log("edited", item);
    let response = await fetch("https://redux-expensetracker-default-rtdb.firebaseio.com/data.json",{
       method : 'PUT',
       body : JSON.stringify(updatedlist),
    }) 
  }

  const deleteHandler = async (item)=>{
     console.log("expense deleted");
     let updatedlist = ctx.listitems.filter((x)=> x.description != item.description);
     ctx.setListitems(updatedlist);
     let response = await fetch("https://redux-expensetracker-default-rtdb.firebaseio.com/data.json",{
        method : 'PUT',
        body : JSON.stringify(updatedlist),
     })
     console.log(updatedlist)
    


  };

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
                        <td><button onClick={()=>editHandler(items)}>Edit</button></td>
                        <td><button onClick={()=>deleteHandler(items)}>Delete</button></td>
                      </tr>
                 })
             }
            </tbody>
        </Table>
        </div>
}
export default Listitems;

