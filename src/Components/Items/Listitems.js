import { useContext, useState } from "react";
import Context from "../Store/AuthContext";
import classes from './Listitems.module.css';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import { listActions } from "../Store/ReduxStore";

const Listitems = ()=>{
  let ctx =   useContext(Context);
     const list = useSelector((state)=>state.listdata.listitems);
    
     const dispatch = useDispatch();

  const editHandler = async (item)=>{
    ctx.setAmount(item.amount);
    ctx.setDescription(item.description)
    ctx.settotal((pre)=>pre- (item.amount));
     let updatedlist = list.filter((x)=>{return x.description != item.description});
    dispatch(listActions.entereddata(updatedlist));
    console.log("edited", item);
    let response = await fetch("https://redux-expensetracker-default-rtdb.firebaseio.com/data.json",{
       method : 'PUT',
       body : JSON.stringify(updatedlist),
    }) 
  }

  const deleteHandler = async (item)=>{
     console.log("expense deleted");
     ctx.settotal((pre)=>pre- (item.amount));
    let updatedlist = list.filter((x)=>{return x.description != item.description});
    dispatch(listActions.entereddata(updatedlist));
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
                // let count =0;
                list.map((items)=>{
                  //  settotal((pre)=>pre+items.amount);
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
        {/* settotal(total); */}

        </div>
}
export default Listitems;

