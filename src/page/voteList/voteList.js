import React ,{Component} from 'react';
import axios from 'axios';
import { Button,Icon,Input,Modal} from 'antd';
import {configUrl} from '../configUrl/configUrl.js';
import './voteList.css';
import qrcode from '../../static/qrcode.png';
class voteList extends Component{
  constructor(props){
    super(props);
    this.state={
      downloadQrcode:'',
      voteList:[],
      visible:false,
      visibles:false
    }
  }
  // urls=''
  componentDidMount(){
    let eventId=this.props.match.params.eventId;
    axios.get(`${configUrl}api/goods/contribute/list/${eventId}`)
    .then((res)=>{
      console.log('voteList',res.data.content)
      this.setState({
        voteList:res.data.content
      })
    })
    .catch((err)=>{
      console.log('err voteList');
    })
    // let url=window.location.href;
    // this.urls=url.substring(0,url.indexOf("com")+4);
    // var u = navigator.userAgent;
    // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    // if(isiOS){
    //     this.setState({
    //       downloadQrcode:this.urls+'qrcodeios.png'
    //     })
    // }else if(isAndroid){
    //     this.setState({
    //       downloadQrcode:this.urls+'qrcodeandroid.png'
    //     })
    // }
  }
  onFocusSearch(){
    this.props.history.push("/Search");
  }
  onClickRank(){
    this.setState({
      visible: true
    });
  }
  handleOk = e => {
    this.setState({
      visible: false
    });
    let eventId=this.props.match.params.eventId;
    axios.get(`${configUrl}api/goods/contribute/total/${eventId}`)
    .then((res)=>{
      this.setState({
        voteList:res.data.content
      })
    })
    .catch((err)=>{
      console.log('err rank voteList');
    })
  }
  handleCancel = e => {
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
  handleShowActivity(){
    this.props.history.push(`/showAllActivityList`);
  }
  handleVoteItem(goodsId){
    this.props.history.push(`/voteOne/${goodsId}`);
  }
  render(){
    return (
    <div className="voteList">
    <div className="search">
      <Input className="search_Input" placeholder="可以输入编号或小作者或作品名称搜索" prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.5)' }} />} style={{width:"75%",height:35}} onFocus={this.onFocusSearch.bind(this)}/>
      <Button type="primary" onClick={this.onClickRank.bind(this)}>排序<Icon type="filter" style={{ fontSize: '15px', color: '#fff' }}/></Button>
      <Modal
          title=<p style={{color:"#1890ff"}}>排序提示<Icon type="question-circle" /></p>
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="再想想"
        >
          <p style={{color:'#1890ff'}}>是否按照票数由高到低排序</p>
      </Modal>
    </div>
    <div className="voteList_body">
    {
      this.state.voteList.map((item,index)=>{
        return(
          <div className="voteListItem" key={index} onClick={this.handleVoteItem.bind(this,item.
            iid)}>
            <img src={`${item.pic}`} alt=""/>
            <div className="vote_body">
              <div className="vote_title"><span>作品：{item.title}</span></div>
              <div className="vote_title"><span>作者：{item.username}</span></div>
              <div className="vote_title"><span>城市：{item.city}</span></div>
              <div className="vote_title"><span>编号：{item.iid}</span></div>
              <div className="vote_title"><span>售价：{item.price} 元</span></div>
              <div className="vote_content">
              <span><Icon type="star" style={{ fontSize: '14px', color: '#f00' }} /> 票数:{item.voted}</span>                
              </div>
            </div>
          </div>
        )
      })
    }
    </div>
    <div className='btn'> 
      <Button type="primary" onClick={this.handleShowActivity.bind(this)}>查看所有活动</Button>
      <Button type="danger" onClick={this.votings.bind(this)}>下载App参与活动</Button>
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
            <img src={qrcode}/>
            
          </div>
        </div>
      </Modal>
    </div>
  );
  }
}

export default voteList;
