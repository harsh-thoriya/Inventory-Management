import '../../App.css';
import {useHistory} from 'react-router-dom'

function Dashboard(){

    const history = useHistory(); 
  const Dashboard=(e)=>{
    e.preventDefault()
    let path = '/dashboard'; 
    history.push(path)
  }

  const Request=(e)=>{
    e.preventDefault()
    let path = '/requesthr'; 
    history.push(path)
  }

  const Return=(e)=>{
    e.preventDefault()
    let path = '/returnhr'; 
    history.push(path)
  }

  const Approval=(e)=>{
    e.preventDefault()
    let path = '/approval'; 
    history.push(path)
  }

  const AddInventory=(e)=>{
    e.preventDefault()
    let path = '/addinventory'; 
    history.push(path)
  }
  return(<div className = "App-header">
  <h1 ><b>Home Page</b></h1> 
  <form>
  <button value="dashboard" onClick={Dashboard} > Dashboard</button>
  <button value="request" onClick={Request} > Request</button>
  <button value="return" onClick={Return} > Return</button>
  <button value="approval" onClick={Approval} > Approval</button>
  <button value="AddInventory" onClick={AddInventory} > Add Inventory</button>
</form>
    <div>
    <table>
      <tbody><tr>
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
  </tr></tbody>
  
</table>

    </div>
    <br></br><br></br><br></br><br></br>
    <div>
    <table>
      <tbody><tr>
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
  </tr></tbody>
  
</table>
    </div>
</div> );
} 

export default Dashboard;
