import '../../App.css';
import {useHistory} from 'react-router-dom'

function Home(){

    const history = useHistory(); 
  const HomePage=(e)=>{
    e.preventDefault()
    let path = '/home'; 
    history.push(path)
  }

  const Request=(e)=>{
    e.preventDefault()
    let path = '/request'; 
    history.push(path)
  }

  const Return=(e)=>{
    e.preventDefault()
    let path = '/return'; 
    history.push(path)
  }
  return(<div className = "App-header">
  <h1 ><b>Home Page</b></h1> 
  <form>
  <button value="home" onClick={HomePage} > Home</button>
  <button value="request" onClick={Request} > Request</button>
  <button value="return" onClick={Return} > Return</button>
</form>
    <div>
    <table>
      <tbody>
      <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
      </tbody>
</table>
    </div>
    <br></br><br></br><br></br><br></br>
    <div>
    <table>
      <tbody>
      <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
      </tbody>
</table>
    </div>
</div> );
} 

export default Home;
