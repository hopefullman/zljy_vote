import React ,{Component} from 'react';
import axios from 'axios';
import { Icon,Modal,Button } from 'antd';
import {configUrl} from '../configUrl/configUrl.js';
import './activityListDetail.css';

class activityListDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      activityListDetail:'',
      visibles:false,
      downloadQrcode:''
    }
  }
  urls=''
  componentDidMount(){
    if (sessionStorage.getItem('openid')==undefined||sessionStorage.getItem('openid')==null||sessionStorage.getItem('openid')=='undefined') {
      let oldarray=window.location.href.split('=');
      let openid=oldarray[1];
      sessionStorage.setItem('openid',openid);
    }
    
    let eventId=this.props.match.params.eventId;
    axios.get(`${configUrl}api/event/${eventId}`)
    .then((res)=>{
      console.log('查看全部activityListDetail数据',res);
      this.setState({
        activityListDetail:res.data
      })
    })
    .catch((err)=>{
      console.log('err activityListDetail');
    })
    let url=window.location.href;
    this.urls=url.substring(0,url.indexOf("com")+4);
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    if(isiOS){
        this.setState({
          downloadQrcode:this.urls+'qrcodeios.png'
        })
    }else if(isAndroid){
        this.setState({
          downloadQrcode:this.urls+'qrcodeandroid.png'
        })
    }
  }
  votings(){
    this.setState({
      visibles: true
    });
  }
  handleOks = e => {
    this.setState({
      visibles: false
    });
  };
  handleCancels = e => {
    console.log(e);
    this.setState({
      visibles: false
    });
  };
  handleActivityItem(eventId){
    this.props.history.push(`/voteList/${eventId}`);
  }
  handleShowActivity(){
    this.props.history.push(`/showAllActivityList`);
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
            <div className="activity_titles">
                点击查看此活动详情>>
            </div>
          </div>
          <div className='btn'> 
            <Button type="primary" onClick={this.handleShowActivity.bind(this)}>查看所有活动</Button>
            <Button type="danger" onClick={this.votings.bind(this)}>参与活动</Button>
          </div>
        <Modal
          title=<p style={{color:"#1890ff"}}>参加活动提醒</p>
          visible={this.state.visibles}
          onOk={this.handleOks}
          onCancel={this.handleCancels}
          okText="返回"
          cancelText="关闭"
        >
          <div className="ZJL">
            <div className="qrcode">
              <div className="border">
                <span>参赛方式</span>
              </div>
              <p>若您想参加大赛，请您在少儿画app中上传画作。识别二维码，下载注册登录少儿画app！</p>
              <img src={`${this.state.downloadQrcode}`}/>
            </div>
          </div>
        </Modal>
      </div>
  );
  }
}

export default activityListDetail;