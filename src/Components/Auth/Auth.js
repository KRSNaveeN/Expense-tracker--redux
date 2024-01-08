import classes from './Auth.module.css';
import {useContext, useRef,useState} from 'react';
import Context from '../Store/AuthContext'

const Auth = ()=>{

let ctx = useContext(Context);


  return <div className={classes.background}>
    {!ctx.pass && <>
    
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
       

        <div >
            <button onClick={ctx.passwordHandler} className={classes.log}>Forget Password</button>
        </div>

          <div>
           <button onClick={ctx.loginHandler} className={classes.log}>
           <h4 >{!ctx.login ? "Already have an Account? Login" : "Sign up with new Account"}</h4>
            </button> 
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