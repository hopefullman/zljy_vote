import React ,{Component} from 'react';
import axios from 'axios';
import { Button,message,Icon,Modal} from 'antd';
import {CopyToClipboard } from 'react-copy-to-clipboard'
import {configUrl} from '../configUrl/configUrl.js';
import './voteOne.css';
let goodsId="";
let eventId="";


class voteOne extends Component{
  constructor(props){
    super(props);
    this.state={
      voteOne:'',
      voteList:[],
      voted:false,
      visible:false
    }
  }
urls=''
async  componentDidMount(){
    let url=window.location.href;
    this.urls=url.substring(0,url.indexOf("com")+4);
    goodsId=this.props.match.params.goodsId;
    //在此处获取投票详情
    axios.get(`${configUrl}api/goods/${goodsId}`)
    .then((res)=>{
      this.setState({
        voteOne:res.data,
        voteList:res.data.voteList
      })
    })
    .catch((err)=>{
      console.log('err voteOne时候，取投票详情发生错误！');
    })
    //在此处获取openid，并且发送请求查看此人是否为此作品投过票
    let openid=sessionStorage.getItem('openid');
    await axios.get(`${configUrl}api/vote/voted?goodsId=${goodsId}&openid=${openid}`)
    .then((res)=>{
      this.setState({
        voted:res.data
      })
    })
    .catch((err)=>{
      console.log('err voteOne时候，HAS取投票详情发生错误！');
    })
  }
  voting(){
    this.setState({
      visible: true
    });
  }
  handleOk = e => {
    let openid=sessionStorage.getItem('openid');
    this.setState({
      visible: false
    });
    //发一个请求，将iid,openid发的送出去,进行投票
    let data={
      goodsId:goodsId,
      openid:openid
    }
    axios.post(`${configUrl}api/vote`,data)
    .then((res)=>{
      if (res.data.message=='ok') {
        message.info('投票成功！');
        this.setState({
          voted:true,
        })
        //重新在此处获取投票详情
        axios.get(`${configUrl}api/goods/${goodsId}`)
        .then((res)=>{
          this.setState({
            voteOne:res.data,
            voteList:res.data.voteList
          })
        })
        .catch((err)=>{
          console.log('err voteOne时候，重新在此处获取投票详情详情发生错误！');
        })
      }else{
        message.info('投票失败！');
      }
    })
    .catch((err)=>{
      console.log('err voteOne时候，vote投票发生错误！');
    })
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  voted(){
   message.config({
    top: 100,
    duration: 1,
    maxCount: 3,
  });
    message.info('已成功为TA投票，请不要重复投票！')
  }
  sharing(){
    
  }
  onCopy(){
    alert('复制链接成功！')
  }
  render(){
    return (
    <div className="voteOne">
      <img className="voteOneImg" src={`${this.state.voteOne.pic}`} alt=""/>
      <div className="voteOne_product">作品名称：{this.state.voteOne.title}</div>
      <div className="voteOne_product">作者：{this.state.voteOne.username}</div>
      <div className="voteOne_product">城市：{this.state.voteOne.city}</div>
      <div className="voteOne_product">作品编号：{this.state.voteOne.iid}</div>
      <div className="voteOne_product">投票数量：{this.state.voteOne.voted}</div>
      <div className="voteOne_mans">
      <div className="voteOne_mans_title">投票人员</div>
      <div className="voteOne_mans_headimgurl">
      {
        this.state.voteList.map((item,index)=>{
          return(
            <img src={`${item.headimgurl}`} key={index} alt=""/>
          )
        })
      }
      </div>
      </div>
      {
        this.state.voted?<div className="voted_btn_true">
         <Button onClick={this.voted.bind(this)}>已 为 TA 投 票</Button>
        <CopyToClipboard text={`${this.urls}logo.jpg`} onCopy={this.onCopy.bind(this)}>
          <Button type="danger">复制公众号二维码</Button>
         </CopyToClipboard>
      </div>:<div className="voted_btn_false">
        <Button type="primary" onClick={this.voting.bind(this)}>为 TA 投 票</Button>
      
        <CopyToClipboard text={`${this.urls}logo.jpg`} onCopy={this.onCopy.bind(this)}>
          <Button type="danger" >复制公众号二维码</Button>
        </CopyToClipboard>
        
      </div>
      }      
      <Modal
          title=<p style={{color:"#1890ff"}}>投票提示<Icon type="question-circle" /></p>
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定投票"
          cancelText="再想想"
        >
          <p style={{color:'#1890ff'}}>确定为{this.state.voteOne.username}的{this.state.voteOne.title}投票？</p>
      </Modal>
    </div>
  );
  }
}

export default voteOne;
