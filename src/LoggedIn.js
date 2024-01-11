import classes from './LoggedIn.module.css';
import React, { useContext, useEffect } from 'react';
import { useState} from 'react';
import Additems from './Components/Items/Additems';
import Listitems from './Components/Items/Listitems';
import ProfilePage from './Components/Layout/ProfilePage';
import Context from './Components/Store/AuthContext';
const LoggedIn = ()=>{

     
    
    // const [profile, setProfile]=useState(false);

    // const ProfileHandler = ()=>{
    //     setProfile(true);
    // }
   const ctx = useContext(Context);
 useEffect(()=>{
        if(localStorage.getItem("token") != null){
            ctx.setProfile(false);
        }
    },[])

    console.log(ctx.total, "total caculated");

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
                throw new Error(data.error.message);
              }
             
        }
        catch(error){
            alert(error);
            console.log(error);
        }
      
    };
   
    return <>
    <header className={classes.disp}>
        {!ctx.profile ? <h4>Welcome to Expense tracker</h4> : <h4>Learners never Quit</h4> }
        {!ctx.profile ? <div>
             Your Profile is Incomplete
            <button onClick={ctx.ProfileHandler}>Complete Now</button>
            </div> : <h5>Your Profile</h5>
        }
    </header>
        
     <section>
    {
        !ctx.profile ? <>
        <button onClick={verifyEmailHandler}>Verify Email</button>
        {(ctx.total >= 10000) && <button>Activate Premium</button>}
         <Additems/>
         <Listitems/> 
        </>: <ProfilePage/>
    }
    </section>      
    </>
}

export default LoggedIn;