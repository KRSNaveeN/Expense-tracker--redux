
import { useContext } from 'react';
import Auth from './Components/Auth/Auth';
import LoggedIn from './LoggedIn';
import Context from './Components/Store/AuthContext';
import {BrowserRouter, Route,Routes} from 'react-router-dom'


function App() {
 let ctx = useContext(Context);
 console.log(ctx.userLogged)
  return (
    <BrowserRouter>
    <Routes>
      {!ctx.userLogged ? <Route path='/' element= {<Auth/>}/> : <Route path='/' element={<LoggedIn/>}/>}
     </Routes>
    </BrowserRouter>
      
      
    
  );
}

export default App;
