import classes from './LoggedIn.module.css';
import React, { useContext, useEffect } from 'react';
import { useState, useRef } from 'react';
import Context from './Components/Store/AuthContext';
const LoggedIn = ()=>{
     let ctx = useContext(Context);
     let name = useRef();
   let url = useRef();
    const [profile, setProfile]=useState(false);
    const [naam , setNaam] = useState();
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
            

    }


    useEffect(()=>{
      reshow();
    },[profile])
   
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
    return<>
    <div className={classes.disp}>
        {
            !profile && <><h2>Welcome to Expense tracker</h2>
            <h3>
            Your Profile is Incomplete
            <button onClick={ProfileHandler}>Complete Now</button>
            </h3></>
        }
        {
            profile && <>
            <h2>Learner</h2>
        <h3>
        Complete Your Profile
        {/* <button onClick={ProfileHandler}>Complete Now</button> */}
        </h3>
            </>
        }
       
    </div>
    {
        profile && <section className={classes.contact}>
            <div className={classes.cancel}>
                <h2>Contact</h2>
                <button>Cancel</button>
            </div>
            <div className={classes.details}>
                
                <label htmlFor="">Full Name</label>
                <input ref={name} type='text' value={naam}/>
                <label>Profile Photo URL</label>
                <input ref={url} type='url'/>
            </div>
            <button onClick={updateHandler}>Update</button>
        </section>
    }
      
    </>
}

export default LoggedIn;