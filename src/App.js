import React ,{Component} from 'react';
import { BrowserRouter, Route ,Switch} from 'react-router-dom';
import activityList from './page/activityList/activityList.js';
import activityListDetail from './page/activityListDetail/activityListDetail.js';
import showAllActivityList from './page/showAllActivityList/showAllActivityList.js';
import voteList from './page/voteList/voteList.js';
import voteOne from './page/voteOne/voteOne.js';
import Fail from './page/Fail/Fail.js';
import Search from './page/Search/Search.js';
import 'antd/dist/antd.css';
window.openid="ouI9nwPvCIYVSyR_y51AifcX1yMI";
class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={activityList}></Route>
        <Route exact path='/showAllActivityList' component={showAllActivityList}></Route>
        <Route exact path='/activityListDetail/:eventId' component={activityListDetail}></Route>
        <Route exact path='/voteList/:eventId' component={voteList}></Route>
        <Route exact path='/voteOne/:goodsId' component={voteOne}></Route>
        <Route exact path='/Search' component={Search}></Route>
        <Route path='' component={Fail}></Route>
      </Switch>
    </BrowserRouter>
  );
  }
}

export default App;
