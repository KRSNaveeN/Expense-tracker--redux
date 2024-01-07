
import { useContext } from 'react';
import Auth from './Components/Auth/Auth';
import LoggedIn from './LoggedIn';
import Context from './Components/Store/AuthContext';

function App() {
 let ctx = useContext(Context);
  return (
    <>
    {!ctx.userLogged ? <Auth/> :  <LoggedIn/>}
   
    </>
      
      
    
  );
}

export default App;
