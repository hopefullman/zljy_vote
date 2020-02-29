import React ,{Component} from 'react';
import './Fail.css';
import fail from '../../static/fail.jpg';
class Fail extends Component{
  constructor(props){
    super(props);
    this.state={
      
    }
  }
  render(){
    return (
    <div className="fail">
      <img src={fail}/>
    </div>
  );
  }
}

export default Fail;
