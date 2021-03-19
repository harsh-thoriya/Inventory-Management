import { useHistory } from 'react-router';
import '../../App.css';

function ReturnHr(){
    const history = useHistory()
  function Event(e){
      console.log('Return Sent')
      e.preventDefault()
    let path = '/dashboard' 
    history.push(path)
  }
  return(<div className = "App-header">
  <h1 ><b>Return Items</b></h1> 
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
  <input type = "radio" name="option" id="1" defaultChecked /> Good
  <input type = "radio" name="option" id="2" /> Bad
  <button value="submit" onClick= {Event} > Submit</button>
</form>
</div> );
} 

export default ReturnHr;
