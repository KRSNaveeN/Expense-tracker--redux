import React, { useEffect } from "react";
import { useState ,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./ReduxStore";
import { listActions } from "./ReduxStore";

const Context = React.createContext({});

export default Context;

export const ContextProvider = (props)=>{
    const [pass , setPass] = useState(false);
       const[load, setLoad] = useState(false);
       const [Amount,setAmount] = useState();
       const [Description, setDescription]= useState();
       let [ total ,settotal] = useState(0);


      const dispatch =  useDispatch();
      const log = useSelector((state)=>state.authdata.login);
      const tokin = useSelector((state)=>state.authdata.token);
      const list = useSelector((state)=> state.listdata.listitems);
      const theme = useSelector((state)=> state.themedata.theme);



    let amount =  useRef();
    let description = useRef();
    let option = useRef();
    
      
    const [profile, setProfile]=useState(false);

    const ProfileHandler = ()=>{
        setProfile(true);
    }
    
    


    const fetchExpenses = async ()=>{

        dispatch(authActions.token(localStorage.getItem("token")));
        let respose =  await fetch("https://redux-expensetracker-default-rtdb.firebaseio.com/data.json");
        let data = await respose.json();
        console.log(data);
        if(data)
        {
        // setListitems(data);
        let Tot = 0;
        let count = data.map((item)=>{
          Tot = Tot+  Number(item.amount);
        });
        settotal(Tot);
        dispatch(listActions.entereddata(data));
        }     
    }

    useEffect(()=>{
      fetchExpenses(); 
    }, []);


    // const userLogged  = !!token;
    const userLogged  = !!tokin;
    console.log("triggered");
    
     const email = useRef();
     const password = useRef();
     const confirm = useRef();
     const reenteredemail = useRef();

     const loggedin = (tokens)=>{
        dispatch(authActions.token(tokens));
    //    setToken(tokens);
       localStorage.setItem("token", tokens);
     }
     console.log("tokenis", tokin);

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
        if(log)
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
      settotal((pre)=>pre + Number(amount.current.value));
      
      let response = await fetch("https://redux-expensetracker-default-rtdb.firebaseio.com/data.json",{
        method : 'PUT',
        body : JSON.stringify([...list, expensedata])
      });
      let ans = await response.json();
      console.log(ans);
    //   setListitems((pre)=>   [...pre, expensedata]);
      dispatch(listActions.entereddata([...list, expensedata]))

      setAmount('');
      setDescription('');
      

  }

        const val = {
            submitHandler : submitHandler,
            
            email : email,
            reenteredemail:reenteredemail,
            password: password,
            confirm : confirm,
            userLogged : userLogged,
            passwordHandler : passwordHandler,passwordcorrection:passwordcorrection,
            pass:pass,
            load:load,
            back : back,
            amount:amount,
            description: description,
            option:option,
            submitHandle : submitHandle,
            Amount : Amount,
            Description : Description,
            setAmount : setAmount,
            setDescription : setDescription,
             profile :profile,
            ProfileHandler : ProfileHandler,
            setProfile : setProfile,
            total : total,
            settotal : settotal

        }
    return<Context.Provider value={val}>
        {props.children}
    </Context.Provider>
}