import classes from './ProfilePage.module.css';
import { useRef,useState,useContext,useEffect } from 'react';
import Context from '../Store/AuthContext';
import { useDispatch } from 'react-redux';
import { authActions } from '../Store/ReduxStore';
const ProfilePage = ()=>{
    const [naam , setNaam] = useState();
    const [photo, setPhoto] = useState();
    let name = useRef();
    let url = useRef();
    let ctx = useContext(Context);
   const dispatch = useDispatch();

    useEffect(()=>{
        reshow();  
      },[]);

    const updateHandler = async ()=>{
        let response = await  fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCOGbilMEGm-OJcFbkBRGvUEBzxEDlvZJ4", {
           method: 'POST',
           body : JSON.stringify({
                displayName : name.current.value,
                photoUrl : url.current.value,
                returnSecureToken : true,
                idToken : localStorage.getItem('token'),
           })
        });
        let data = await response.json();
       }

       const logoutHandler = ()=>{
        localStorage.removeItem("token");
        console.log(ctx.token);
        // ctx.setToken(null);
        dispatch(authActions.token(null));
     }

     
    let reshow = async ()=>{
        let response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCOGbilMEGm-OJcFbkBRGvUEBzxEDlvZJ4", {
            method : 'POST',
            body : JSON.stringify({
                idToken:localStorage.getItem('token')
            }) });


        try{
            console.log(response);
            let data = await response.json();
            if(response.ok){
                setNaam(data.users[0].displayName);
                setPhoto(data.users[0].photoUrl);
            }
            else
            {
               throw new Error(data.error.message);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return<>
    <section className={classes.contact}>
            <div>
                <button onClick={logoutHandler}>LOGOUT</button>
            </div>
            <div className={classes.cancel}>
                <h2>Contact</h2>
                <button>Cancel</button>
            </div>
            <div className={classes.details}>
                
                <label htmlFor="">Full Name</label>
                <input ref={name} type='text' value={naam} onChange={(e)=> setNaam(e.target.value)}/>
                <label>Profile Photo URL</label>
                <input ref={url} type='url' value={photo} onChange={(e)=> setPhoto(e.target.value)}/>
            </div>
            <button onClick={updateHandler}>Update</button>
        </section>

    </>
}

export default ProfilePage;