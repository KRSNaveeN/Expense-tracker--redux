import classes from './LoggedIn.module.css';
import React from 'react';
import { useState, useRef } from 'react';
const LoggedIn = ()=>{

    const [profile, setProfile]=useState(false);
    const ProfileHandler = ()=>{
        setProfile(true);
    }
   let name = useRef();
   let url = useRef();
    const updateHandler = async ()=>{
     let response = await  fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCOGbilMEGm-OJcFbkBRGvUEBzxEDlvZJ4", {
        method: 'POST',
        body : JSON.stringify({
             displayName : name.current.value,
             photoURL : url.current.value,
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
        profile && <section>
            <div className={classes.cancel}>
                <h2>Contact</h2>
                <button>Cancel</button>
            </div>
            <div>
                <label htmlFor="">Full Name</label>
                <input ref={name} type='text'/>
                <label>Profile Photo URL</label>
                <input ref={url} type='url'/>
            </div>
            <button onClick={updateHandler}>Update</button>
        </section>
    }
      
    </>
}

export default LoggedIn;