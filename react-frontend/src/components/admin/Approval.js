import '../../App.css';

import {useHistory} from 'react-router-dom'

function Approval(){

    const history = useHistory(); 
  const Done=(e)=>{
      console.log("Approval Done");
    e.preventDefault()
    let path = '/dashboard'; 
    history.push(path)
  }
  return(<div className = "App-header">
  <h1 ><b>Approval Page</b></h1> 
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
<form>
    <button value="done" onClick={Done}>Done</button>
    </form> 
</div>);
} 

export default Approval;
