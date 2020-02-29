import React ,{Component} from 'react';
import axios from 'axios';
import { Button,Icon,Input,Modal} from 'antd';
import {configUrl} from '../configUrl/configUrl.js';
import './voteList.css';

class voteList extends Component{
  constructor(props){
    super(props);
    this.state={
      voteList:[],
      visible:false
    }
  }
  componentDidMount(){
    let eventId=this.props.match.params.eventId;
    // sessionStorage.setItem('eventId',eventId);
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
    </div>
  );
  }
}

export default voteList;
