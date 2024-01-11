import classes from './Auth.module.css';
import {useContext, useRef,useState} from 'react';
import Context from '../Store/AuthContext'

import {useDispatch,useSelector} from 'react-redux';
import { authActions } from '../Store/ReduxStore';

const Auth = ()=>{

let ctx = useContext(Context);

   let  dispatch = useDispatch();
   let login = useSelector((state)=>state.authdata.login);
//    dispatch(authActions.login)
console.log(authActions,login);

const loginHandler = ()=>{
    dispatch(authActions.login());
}


  return <div className={classes.background}>
    {!ctx.pass && <>
    
    <form onSubmit={ctx.submitHandler} className={classes.backdrop}>
    <div>
    
    <h3>{!login ? "Sign up" : "Login"}</h3>
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

<button >{!login ? "Sign up" : "Login"}</button>
    </div>

</form>
       <div className={classes.btns}>

        <div  >
            <button onClick={ctx.passwordHandler} className={classes.log}>Forget Password</button>
        </div>

          <div>
         
          <h5 > <button onClick={loginHandler} className={classes.log}>
            {!login ? "Already have an Account? Login" : "Sign up with new Account"}
            </button> 
            </h5>
            
        </div>
        </div>
        </>}

        {
            ctx.pass && <><div className={classes.forgotpassword}>
                   <label>Enter email</label>
                   <input ref={ctx.reenteredemail} type="email"/>
                   <button onClick={ctx.passwordcorrection}>send password reset link</button>
                   
                </div>
                <button onClick={ctx.back}>Back</button>
                </>
        }
        {
            ctx.load && <h2>Loading.....</h2>
        }

        

   

    </div>
}

export default Auth;