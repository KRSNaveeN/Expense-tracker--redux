import React, { useEffect } from "react";
import { useState ,useRef} from "react";

const Context = React.createContext({});

export default Context;

export const ContextProvider = (props)=>{
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState(null);

    const loginHandler = ()=>{
        setLogin(true);
     }
      const  userLogged = !!(localStorage.getItem("token"));
   
     

     const email = useRef();
     const password = useRef();
     const confirm = useRef();
     const loggedin = (token)=>{
       setToken(token)
       localStorage.setItem("token", token);
     }

     const submitHandler = async (event)=>{
        event.preventDefault();
        let url = "";
        if(login)
        {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOGbilMEGm-OJcFbkBRGvUEBzxEDlvZJ4";
        }
        else{
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOGbilMEGm-OJcFbkBRGvUEBzxEDlvZJ4"
        }

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
            let response = await fetch(url, {
                method: 'POST',
                body : JSON.stringify(data)
            });
            
            if(response.ok){
            let ans = await response.json();
            console.log(ans);
            loggedin(ans.idToken);
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

        const val = {
            submitHandler : submitHandler,
            loginHandler : loginHandler,
            login : login,
            setLogin : setLogin,
            email : email,
            password: password,
            confirm : confirm,
            userLogged : userLogged
        }
    return<Context.Provider value={val}>
        {props.children}
    </Context.Provider>
}