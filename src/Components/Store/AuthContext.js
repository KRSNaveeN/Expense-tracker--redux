import React, { useEffect } from "react";
import { useState ,useRef} from "react";

const Context = React.createContext({});

export default Context;

export const ContextProvider = (props)=>{
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [pass , setPass] = useState(false);
       const[load, setLoad] = useState(false);
       const [Amount,setAmount] = useState();
       const [Description, setDescription]= useState();



    let amount =  useRef();
    let description = useRef();
    let option = useRef();
    const [listitems, setListitems] = useState([]);

    const fetchExpenses = async ()=>{
        setToken(localStorage.getItem("token"));
        let respose =  await fetch("https://redux-expensetracker-default-rtdb.firebaseio.com/data.json");
        let data = await respose.json();
        console.log(data);
        if(data)
        {
        //     setListitems([]);
        setListitems(data);
        }
        // else{
        //     setListitems(data);
        // }
        // setListitems(data);
        
    }

    useEffect(()=>{
      fetchExpenses();
      
    }, []);

    const loginHandler = ()=>{
        setLogin((pre)=>!pre);
     }
    // const  userLogged = !!(localStorage.getItem("token"));
    const userLogged  = !!token;
    //   console.log(localStorage.getItem("token"), userLogged);



      console.log("triggered");
    
   
     

     const email = useRef();
     const password = useRef();
     const confirm = useRef();
     const reenteredemail = useRef();
     const loggedin = (tokens)=>{
       setToken(tokens);
       localStorage.setItem("token", tokens);
     }
     console.log("tokenis", token);

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

       

  const submitHandle = async (e)=>{
      e.preventDefault();
      let expensedata={
        amount : amount.current.value,
        description : description.current.value,
        option : option.current.value
      }
      
      
      let response = await fetch("https://redux-expensetracker-default-rtdb.firebaseio.com/data.json",{
        method : 'PUT',
        body : JSON.stringify([...listitems, expensedata])
      });
      let ans = await response.json();
      console.log(ans);
      setListitems((pre)=>   [...pre, expensedata]);

      setAmount('');
      setDescription('');
      

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
            listitems : listitems,
            setListitems : setListitems,
            token : token,
            Amount : Amount,
            Description : Description,
            setAmount : setAmount,
            setDescription : setDescription
            // setuserlogged :setuserlogged
        }
    return<Context.Provider value={val}>
        {props.children}
    </Context.Provider>
}