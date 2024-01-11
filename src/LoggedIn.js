import classes from './LoggedIn.module.css';
import React, { useContext, useEffect } from 'react';
import { useState} from 'react';
import Additems from './Components/Items/Additems';
import Listitems from './Components/Items/Listitems';
import ProfilePage from './Components/Layout/ProfilePage';
import Context from './Components/Store/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { themeActions } from './Components/Store/Slices/Themeslice';
import MyComponent from './Components/Download/download';
const LoggedIn = ()=>{
    

    let dispatch = useDispatch();
    let premium = useSelector((state)=>state.themedata.theme)
    let togglebtn = useSelector((state)=> state.themedata.togglebtn)
     
    
    
   const ctx = useContext(Context);
 useEffect(()=>{
        if(localStorage.getItem("token") != null){
            ctx.setProfile(false);
        }
    },[]);



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

    const premiumHandler = ()=>{
        
          dispatch(themeActions.premium());
    }
    const toggleHandler = ()=>{
        dispatch(themeActions.toggle());
    }
   
    return <div className={premium ? classes.premium : undefined}>
    <header className={classes.disp}>
        {!ctx.profile ? <h4>Welcome to Expense tracker</h4> : <h4>Learners never Quit</h4> }
        {!ctx.profile ? <div>
             Your Profile is Incomplete
            <span onClick={ctx.ProfileHandler}>Complete Now</span>
            </div> : <h5>Your Profile</h5>
        }
    </header>
        
     <section>
    {
        !ctx.profile ? <div >
        <div className={classes.btns}>
        <button onClick={verifyEmailHandler}>Verify Email</button>
        {(ctx.total >= 10000) && <>
            <button onClick={premiumHandler}>Activate Premium</button>
            
            {togglebtn && (<button onClick={toggleHandler}>Theme</button>)}
            
            </> }
        <MyComponent/>
        
        </div>
       
         <Additems/>
         <Listitems/> 
        </div>: <ProfilePage/>
    }
    </section>      
    </div>
}

export default LoggedIn;