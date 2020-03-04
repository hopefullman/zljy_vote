import React ,{Component} from 'react';
import axios from 'axios';
import { Icon } from 'antd';
import {configUrl} from '../configUrl/configUrl.js';
import './activityListDetail.css';

class activityListDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      activityListDetail:''
    }
  }
  componentDidMount(){
  // let webSocketUrl = "ws://m.zhonglianjiye.com/socket/goods/25";
  //   let socket = new WebSocket(webSocketUrl);
  //   socket.onopen=function () {
  //       console.log("成功连接服务器！");
  //   }
  //   socket.onclose=function (e) {
  //       console.log(e);
  //   }
  //   socket.onmessage=function (e) {
  //       let data = JSON.parse(e.data);
  //       console.log(data)
  //       // $("#remain_day").text(data.days);
  //       // $("#remain_hour").text(data.hours<10?"0"+data.hours:data.hours);
  //       // $("#remain_minute").text(data.minutes<10?"0"+data.minutes:data.minutes);
  //       // $("#remain_second").text(data.seconds<10?"0"+data.seconds:data.seconds);
  //   } 
    if (window.openid==undefined||window.openid==null) {
        let oldarray=window.location.href.split('=');
        let openid=oldarray[1];
        sessionStorage.setItem('openid',openid);
    }
    
    let eventId=this.props.match.params.eventId;
    axios.get(`${configUrl}api/event/${eventId}`)
    .then((res)=>{
      this.setState({
        activityListDetail:res.data
      })
    })
    .catch((err)=>{
      console.log('err activityListDetail');
    })
  }
  handleActivityItem(eventId){
    this.props.history.push(`/voteList/${eventId}`);
  }
  render(){
    return (
      <div className="activityList">
          <div className="activityListItem" onClick={this.handleActivityItem.bind(this,this.state.activityListDetail.id)}>
            <div className="activityListItem_header" >
              <img src={`${this.state.activityListDetail.cover}`}  alt=""/>
              <div className="activity_title"><h1><Icon type="tags" theme="twoTone" twoToneColor="#faad14"/>标题：{this.state.activityListDetail.title}</h1>
              </div>
              <div className="activity_title">
                <h2><Icon type="book" theme="twoTone" twoToneColor="#096dd9"/>编号：{this.state.activityListDetail.id}</h2>
              </div>
              <div className="activity_title">
                <h2><Icon type="environment" theme="twoTone" twoToneColor="#bfbfbf"/>位置：{this.state.activityListDetail.city}</h2>
              </div>
              <div className="activity_title">
                <h2><Icon type="clock-circle" theme="twoTone" twoToneColor="#52c41a"/>时间：{this.state.activityListDetail.startTime}</h2>
              </div>
              <div className="activity_content">简介：{this.state.activityListDetail.content}</div>
            </div>
            
          </div>
      </div>
  );
  }
}

export default activityListDetail;
