import '../App.css';
import {useHistory} from 'react-router-dom'

function Login(){

  const history = useHistory(); 
  const Event=(e)=>{
    e.preventDefault()
    let path = '/home';
    //let path = '/dashboard'; 
    history.push(path)
  }

  return(<div className = "App-header">
  <h1 ><b>Login Page</b></h1> 
  <form>
  <label>Email
    <input type="text" name="email" />
  </label>
  <br></br>
  <label>Password
    <input type="text" name="password" />
  </label>
  <br></br>
  <button value="login" onClick={Event} > Login</button>
</form>
</div> );
} 

export default Login;
