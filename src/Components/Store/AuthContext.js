import React, { useEffect } from "react";
import { useState ,useRef} from "react";

const Context = React.createContext({});

export default Context;

export const ContextProvider = (props)=>{
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [pass , setPass] = useState(false);
    const[load, setLoad] = useState(false);

    let amount =  useRef();
    let description = useRef();
    let option = useRef();
    const [listitems, setListitems] = useState([]);

    const loginHandler = ()=>{
        setLogin((pre)=>!pre);
     }
      const  userLogged = !!(localStorage.getItem("token"));
   
     

     const email = useRef();
     const password = useRef();
     const confirm = useRef();
     const reenteredemail = useRef();
     const loggedin = (token)=>{
       setToken(token)
       localStorage.setItem("token", token);
     }

     const passwordHandler = () =>{
        console.log("inside 1");
        setPass(true)
     }
     const back = ()=>{
        setPass(false);
     }

     const passwordcorrection = async ()=>{
        console.log("inside 2");
        setLoad((pre)=>!pre);
        console.log(reenteredemail.current.value);
        console.log("inside password");
          let response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCOGbilMEGm-OJcFbkBRGvUEBzxEDlvZJ4",{
              method : 'POST',
              body : JSON.stringify({
                requestType : "PASSWORD_RESET",
                email : reenteredemail.current.value,
              })
          });

          if(response.ok)
          {
            let data = await response.json();
            console.log(data);
          }
          setLoad((pre)=>!pre)
          setPass(false);
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

       

  const submitHandle = (e)=>{
      e.preventDefault();
      let expensedata={
        amount : amount.current.value,
        description : description.current.value,
        option : option.current.value
      }
      setListitems((pre)=>[...pre, expensedata]);
  }

        const val = {
            submitHandler : submitHandler,
            loginHandler : loginHandler,
            login : login,
            setLogin : setLogin,
            email : email,
            reenteredemail:reenteredemail,
            password: password,
            confirm : confirm,
            userLogged : userLogged,
            setToken : setToken,
            passwordHandler : passwordHandler,passwordcorrection:passwordcorrection,
            pass:pass,
            load:load,
            back : back,
            amount:amount,
            description: description,
            option:option,
            submitHandle : submitHandle,
            listitems : listitems
        }
    return<Context.Provider value={val}>
        {props.children}
    </Context.Provider>
}