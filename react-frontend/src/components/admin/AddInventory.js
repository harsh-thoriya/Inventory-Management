import { useHistory } from 'react-router';
import '../../App.css';

function AddInventory(){
  const history = useHistory()
  function Event(e){
    console.log('Added into inventory')
    e.preventDefault()
    let path = '/dashboard'; 
    history.push(path)
  }
  return(<div className = "App-header">
  <h1 ><b>Adding Items into inventory</b></h1> 
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
  <label>Company-name
    <input type="text" name="Company-name" />
  </label>
  <br></br>
  <label>Quantity
    <input type="text" name="Quantity" />
  </label>
  <br></br>
  <label>Price
    <input type="text" name="Price" />
  </label>
  <br></br>
  <button value="submit" onClick= {Event} > Submit</button>
</form>
</div> );
} 

export default AddInventory;
