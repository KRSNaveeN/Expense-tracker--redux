import classes from './Auth.module.css';
import {useRef} from 'react';


const Auth = ()=>{
   const email = useRef();
   const password = useRef();
   const confirm = useRef();
    
    const submitHandler = async (event)=>{
        event.preventDefault();

        if(password.current.value != confirm.current.value)
        {
            alert("PASSWORD NOT MATCHING");
            return;
        }

        let data ={
            email : email.current.value,
            password : password.current.value,
            returnSecureToken : true
        }
     try{
        let response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOGbilMEGm-OJcFbkBRGvUEBzxEDlvZJ4", {
            method: 'POST',
            body : JSON.stringify(data)
        });
        
        if(response.ok){
        let ans = await response.json();
        console.log(ans);
        }
        else
        {
            throw new Error("Authentication failed");
        }
    }
    catch(error)
    {
        alert(error);
    }

    }


    return <form onSubmit={submitHandler} className={classes.backdrop}>
        <div>
        <h3>Sign up</h3>
    <section className={classes.sec}>

        <div>
            <label>Email</label>
            <input ref={email} type='text' required/>
        </div>
        <div>
            <label>Password</label>
            <input ref={password} type='password' required/>
        </div>
        <div>
            <label>Confirm Password</label>
            <input ref={confirm} type='password' required/>
        </div>
    </section>
     <button>Sign Up</button>
        </div>

   

    </form>
}

export default Auth;