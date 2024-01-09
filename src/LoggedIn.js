import classes from './LoggedIn.module.css';
import React, { useContext, useEffect } from 'react';
import { useState, useRef } from 'react';
import Context from './Components/Store/AuthContext';
import Additems from './Components/Items/Additems';
import Listitems from './Components/Items/Listitems';
const LoggedIn = ()=>{
     let ctx = useContext(Context);
     let name = useRef();
   let url = useRef();
    const [profile, setProfile]=useState(false);
    const [naam , setNaam] = useState();
    const [photo, setPhoto] = useState();
    const ProfileHandler = ()=>{
        setProfile(true);
    }
    let NAAM;
    let reshow = async ()=>{
        let response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCOGbilMEGm-OJcFbkBRGvUEBzxEDlvZJ4", {
            method : 'POST',
            body : JSON.stringify({
                idToken:localStorage.getItem('token')
            }) });
            let data = await response.json();
            console.log(data.users[0].displayName);
            console.log(name);
           setNaam(data.users[0].displayName);
           setPhoto(data.users[0].photoUrl);
            

    }


    useEffect(()=>{
      reshow();
      
    },[profile]);

    useEffect(()=>{
        if(localStorage.getItem("token") != null){
            setProfile(false);
        }
    },[])



    const verifyEmailHandler = async ()=>{
        try{
            let response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCOGbilMEGm-OJcFbkBRGvUEBzxEDlvZJ4",{
                method : 'POST',
                body : JSON.stringify({
                    requestType:"VERIFY_EMAIL",
                    idToken : localStorage.getItem('token'),
                })
              });
              console.log(response);
              if(response.ok){
                const data = await response.json();
                console.log(data);
              }
              else
              {
                let data = await response.json();
                // console.log(data.error.message);
                throw new Error(data.error.message);
              }
             
        }
        catch(error){
            alert(error);
            console.log(error);
        }
      
    };
   
    const updateHandler = async ()=>{
     let response = await  fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCOGbilMEGm-OJcFbkBRGvUEBzxEDlvZJ4", {
        method: 'POST',
        body : JSON.stringify({
             displayName : name.current.value,
             photoUrl : url.current.value,
             returnSecureToken : true,
             idToken : localStorage.getItem('token'),
        })
     });
     let data = await response.json();
     console.log(data);
    }

    const logoutHandler = ()=>{
        localStorage.removeItem("token");
        console.log(ctx.token);
        ctx.setToken(null);
    
        

        console.log("inside logout");
       
     }
    return <>
    <div className={classes.disp}>
        {
            !profile && <><h4>Welcome to Expense tracker</h4>
            <div>
            Your Profile is Incomplete
            <button onClick={ProfileHandler}>Complete Now</button>
            </div></>
        }
        
        {
            profile && <>
            <h4>Learners never Quit</h4>
        <div>
         Your Profile
        </div>

        </>
        }
        
       
    </div>
        {
            !profile && <button onClick={verifyEmailHandler}>Verify Email</button>
        }
        {
            !profile &&  <Additems/>
        }
        {
            !profile && <Listitems/> 
        }
    {*9/    +
        profile && <section className={classes.contact}>
            <div>
                <button onClick={logoutHandler}>LOGOUT</button>
            </div>
            <div className={classes.cancel}>
                <h2>Contact</h2>
                <button>Cancel</button>
            </div>
            <div className={classes.details}>
                
                <label htmlFor="">Full Name</label>
                <input ref={name} type='text' value={naam} onChange={(e)=> setNaam(e.target.value)}/>
                <label>Profile Photo URL</label>
                <input ref={url} type='url' value={photo} onChange={(e)=> setPhoto(e.target.value)}/>
            </div>
            <button onClick={updateHandler}>Update</button>
        </section>
    }
   
      
    </>
}

export default LoggedIn;