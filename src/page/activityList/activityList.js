import React ,{Component} from 'react';
import axios from 'axios';
import { Icon } from 'antd';
import {configUrl} from '../configUrl/configUrl.js';
import './activityList.css';

class activityList extends Component{
  constructor(props){
    super(props);
    this.state={
      activityList:[]
    }
  }
  componentDidMount(){
    axios.get(`${configUrl}api/event/list`)
    .then((res)=>{
      console.log('查看全部activityList数据',res);
      this.setState({
        activityList:res.data.content
      })
    })
    .catch((err)=>{
      console.log('err activityList');
    })
  }
  handleActivityItem(eventId){
    this.props.history.push(`/activityListDetail/${eventId}`);
  }
  handleShowActivity(){
    this.props.history.push(`/showAllActivityList`);
  }
  render(){
    return (
    <div className="activityList">
    {
      this.state.activityList.map((item,index)=>{
        return(
          <div className="activityListItem" key={index} >
            <div className="activityListItem_header" onClick={this.handleActivityItem.bind(this,item.id)}>
              <img src={`${item.cover}`}  alt=""/>
              <div className="activity_title"><h1><Icon type="tags" theme="twoTone" twoToneColor="#faad14"/>标题：{item.title}</h1>
              </div>
              {/* 
              <div className="activity_title">
                <h2><Icon type="book" theme="twoTone" twoToneColor="#096dd9"/>编号：{item.id}</h2>
              </div>
              <div className="activity_title">
                <h2><Icon type="environment" theme="twoTone" twoToneColor="#bfbfbf"/>位置：{item.city}</h2>
              </div>
              <div className="activity_title">
                <h2><Icon type="clock-circle" theme="twoTone" twoToneColor="#52c41a"/>开始时间：{item.startTime}</h2>
              </div>
              */}
              
              <div className="activity_title">
                <h2><Icon type="clock-circle" theme="twoTone" twoToneColor="#52c41a"/>截止时间：{item.endTime}</h2>
              </div>
              <div className="activity_titles">
                点击查看此活动详情>>
              </div>
            </div>
            {/*<div className="activityListItem_content" onClick={this.handleShowActivity.bind(this)}>点击查看少儿画所有活动>></div>*/}
          </div>
        )
      })
    }
    </div>
  );
  }
}

export default activityList;