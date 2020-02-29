import React ,{Component} from 'react';
import axios from 'axios';
import { Icon,Input,message} from 'antd';
import {configUrl} from '../configUrl/configUrl.js';
import './Search.css';

class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      show:false,
      searchVoteList:[]
    }
  }
   componentDidMount () {
    this.input.focus()
  }
  onChangeText(e){
    let searchValue=e.target.value;
    let data={
      title:searchValue,
      username:searchValue,
      iid:searchValue
    }
    axios.post(`${configUrl}api/goods/search`,data)
      .then((res)=>{
        if (res.data.length>0) {
          this.setState({
            searchVoteList:res.data,
            show:true
          })
        }else{
          this.setState({
            show:false
          })
        }
      })
      .catch((err)=>{
        console.log('err search');
        message.destroy();
        message.info('请您按照正确的格式搜索，可以是作品名称/小作者/编号！')
      })
  }
  handleSearchVoteItem(iid){
    this.props.history.push(`/voteOne/${iid}`);
  }
  render(){
    return (
    <div className="Search_page">
      <div className="search_title">
        <Input  className="search_Input" 
              placeholder="可以输入编号或小作者或作品名称搜索" 
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.5)' }} />} 
              onChange={(e)=>this.onChangeText(e)}
              ref={(input) => this.input = input}/>
      </div>
      <div className="search_content">
        {
          this.state.show==false?<div className="search_content_title">神马都没有！</div>:<div>
            {
              this.state.searchVoteList.map((item,index)=>{
                return(
                  <div className="voteListItem" key={index} onClick={this.handleSearchVoteItem.bind(this,item.iid)}>
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
        }
      </div>
    </div>
  );
  }
}

export default Search;
