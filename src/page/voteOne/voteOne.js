import React ,{Component} from 'react';
import axios from 'axios';
import { Button,message,Icon,Modal} from 'antd';
import {CopyToClipboard } from 'react-copy-to-clipboard'
import {configUrl} from '../configUrl/configUrl.js';
import arrow from '../../static/arrow.jpg';
import './voteOne.css';
let goodsId="";
let eventId="";

class voteOne extends Component{
  constructor(props){
    super(props);
    this.state={
      downloadQrcode:'',
      voteOne:'',
      voteList:[],
      voted:false,
      visible:false,
      visibles:false
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
      console.log(res);
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
      console.log('判断投票与否',res);
      this.setState({
        voted:res.data
      })
    })
    .catch((err)=>{
      console.log('err voteOne时候，HAS取投票详情发生错误！');
    })
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
      console.log('投票',res)
      if (res.data.message=='ok') {
        message.info('投票成功！');
        this.setState({
          voted:true,
        })
        //重新在此处获取投票详情
        axios.get(`${configUrl}api/goods/${goodsId}`)
        .then((res)=>{
          console.log(res)
          this.setState({
            voteOne:res.data,
            voteList:res.data.voteList
          })
        })
        .catch((err)=>{
          console.log('err voteOne时候，重新在此处获取投票详情详情发生错误！');
        })
      }else{
        message.info('投票失败！请您从少儿画微信公众号投票入口进入投票！');
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
  voted(){
   message.config({
    top: 100,
    duration: 1,
    maxCount: 3,
  });
    message.info('已成功为TA投票，请不要重复投票！')
  }
  // sharing(){
    
  // }
  // onCopy(){
  //   alert('复制链接成功！')
  // }
  render(){
    return (
    <div className="voteOne">
      
      {/*<div className="arrow">
        <img src={arrow}/>
      </div>*/}
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
          <Button type="danger" onClick={this.votings.bind(this)}>参与活动</Button>
      </div>:<div className="voted_btn_false">
        <Button type="primary" onClick={this.voting.bind(this)}>为 TA 投 票</Button>
        <Button type="danger" onClick={this.votings.bind(this)}>参与活动</Button>
      </div>
      }      
      <Modal
          title=<p style={{color:"#1890ff"}}>投票提示</p>
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定投票"
          cancelText="再想想"
        >
          <p style={{color:'#1890ff'}}>确定为{this.state.voteOne.username}的{this.state.voteOne.title}投票？</p>
      </Modal>

      <Modal
          title=<p style={{color:"#1890ff"}}>参加活动提醒</p>
          visible={this.state.visibles}
          onOk={this.handleOks}
          onCancel={this.handleCancels}
          okText="关闭"
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

export default voteOne;
