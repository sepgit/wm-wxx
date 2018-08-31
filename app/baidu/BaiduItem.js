import React, { Component } from 'react';
import '../css/weui.css';
import HTTPED from '../address';

class BaiduItem extends Component {
  constructor(props) {
    super(props);
    this.GetDetail = this.GetDetail.bind(this);
    this.AddProvonClick = this.AddProvonClick.bind(this);

    this.state={
      KeyID:0,
      user:0,
      vippic:'',
      platpic:'',
      addpic:'',
      detailpic:''
    }
  }

  componentWillMount() {
    let a = 0;
    if (this.props.Type!='FW') {
      a = this.props.adva;
    } else {
      a = this.props.cont;
    }
    this.setState({
      KeyID:a,
      BinduserName:this.props.BinduserName,
      wxtoken:this.props.wxtoken,
      user:this.props.user,
      serv:this.props.serv,
      port:this.props.port,
      vippic: HTTPED+ "images/nvip.png",
      platpic:HTTPED+ "images/plat.png",
      addpic: HTTPED+ "images/add.png",
      detailpic:HTTPED+ "images/detail.png",
    });
  }

  GetDetail(){
    //console.log("adva1="+this.state.keyID);
    let a= this.state.KeyID;
    this.props.DetailProp(a);
  }

  AddProvonClick(){
    let a= this.props.user;
    this.props.AddpProp(a);
  }

  render() {
    return (
      <div className="item">
        <div className="demo_line_01"></div>
        <div className="weui-flex">
          {
            this.props.isVIP==1?
              <img className="LabelImage" src={this.state.vippic}/>:<p>　　</p>
          }
          <p>　　　</p>
          <div className="weui-flex__item"><p>联系人：{this.props.textProp}</p></div>
        </div>
        <div className="weui-flex">
          {
            this.props.isPlat==1?
              <img className="LabelImage" src={this.state.platpic}/>:<p>　　</p>
          }
          <p>　　　</p>
          <div className="weui-flex__item"><p>公司简称：{this.props.compAliaName}</p></div>
        </div>
        <div className="weui-flex">
          <p>　　　</p>
          <div className="weui-flex__item"><div className="demo_line_01">　</div></div>
        </div>
        <div className="weui-flex">
          <p>　　　</p>
          <div className="weui-flex__item"><p>{this.props.labe}</p></div>
        </div>
        <div className="weui-flex">
          <p>　　　</p>
          <div className="weui-flex__item"><div className="demo_line_01">　</div></div>
        </div>
        <div className="weui-flex">
          <p>　　　　</p>
          <div className="weui-flex__item">
            <div className="divLabel">
              <a className="linkLabel" href="javascript:void(0);" onClick={this.GetDetail}>
                <img className="LabelImage" src={this.state.detailpic} />查看详情</a>
            </div>
          </div>
          <div className="weui-flex__item">
            <div className="divLabel">
              <a className="linkLabel" href="javascript:void(0);" onClick={this.AddProvonClick}>
                <img className="LabelImage" src={this.state.addpic} />添加为供应商</a>
            </div>
          </div>
        </div>
        <div className="weui-flex">
          <div className="weui-flex__item"><div className="demo_line_01">　</div></div>
        </div>
      </div>
    )
  }
}

export default BaiduItem;