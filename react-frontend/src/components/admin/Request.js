import { useHistory } from 'react-router';
import '../../App.css';

function RequestHr(){
    const history = useHistory()
  function Event(e){
      console.log('Request Sent')
      e.preventDefault()
    let path = '/dashboard' 
    history.push(path)
  }
  return(<div className = "App-header">
  <h1 ><b>Request Items</b></h1> 
  <form>
  <label>Item-Name
    <select>
      <option value="mouse">Mouse</option>
      <option value="keyboard">Keyboard</option>
      <option value="systemLinux">System Linux</option>
      <option value="systemMac">System Mac</option>
      <option value="systemWindows">System Windows</option>
    </select>
  </label>
  <br></br>
  <label>Reason
    <input type="text" name="Reason" />
  </label>
  <br></br>
  <button value="submit" onClick= {Event} > Submit</button>
</form>
</div> );
} 

export default RequestHr;
