import classes from './Auth.module.css';
import {useContext, useRef,useState} from 'react';
import Context from '../Store/AuthContext'

const Auth = ()=>{

let ctx = useContext(Context);


  return <div>
        <form onSubmit={ctx.submitHandler} className={classes.backdrop}>
            <div>
            <h3>{!ctx.login ? "Sign up" : "Login"}</h3>
    <section className={classes.sec}>

        <div>
            <label>Email</label>
            <input ref={ctx.email} type='text' required/>
        </div>
        <div>
            <label>Password</label>
            <input ref={ctx.password} type='password' required/>
        </div>
        <div>
            <label>Confirm Password</label>
            <input ref={ctx.confirm} type='password' required/>
        </div>
    </section>
     <button>{!ctx.login ? "Sign up" : "Login"}</button>
            </div>
       
        </form>

        <div>
           <button className={classes.log}>
           <h4 onClick={ctx.loginHandler}>Already have an Account? Login</h4>
            </button> 
        </div>

   

    </div>
}

export default Auth;