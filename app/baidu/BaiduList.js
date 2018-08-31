import React, { Component } from 'react';
import '../css/weui.css';
import BaiduItem from './BaiduItem.js';
import BackTitle from '../component/BackTitle.js';
import SkipLabel from  '../component/SkipLabel';
import UnEnableInput from  '../component/UnEnableInput';
import HTTPED from '../address';
import Footer from '../component/Footer.js';

class BaiduList extends Component {
  constructor(props) {
    super(props);
    this.Detail = this.Detail.bind(this);
    this.AddProv = this.AddProv.bind(this);
    this.showonClick = this.showonClick.bind(this);

    this.state={
      BinduserName:'',
      wxtoken:'',
      dataList:[],
      SelectID:0,
      vippic:'',
      platpic:'',
      showcondition:0
    }
  }

  componentWillMount() {
    this.setState({
      BinduserName:this.props.BinduserName,
      wxtoken:this.props.wxtoken,
      serv:this.props.serv,
      port:this.props.port,
      vippic: HTTPED+ "images/nvip.png",
      platpic:HTTPED+ "images/plat.png",
    });
  }

  AddProv(a){
    let u = a;
    this.props.AddProv(u);
  }

  Detail(a){
    this.setState({
      SelectID:a
    });
    this.props.GetDetail(a);
  }

  showonClick(){
    let a = this.state.showcondition;
    this.setState({
      showcondition:1-a
    });
  }

  render() {
    return (
      <div>
        <div className="weui-cells">
          <SkipLabel caption={'您当前的搜索条件'}  SelfonClick={this.showonClick}/>
        </div>
        {
          this.state.showcondition==1?
            <div className="weui-cells">
              {this.props.SearchCondition.map(s =>
                <div className="weui-flex">
                  <div className="weui-flex__item"><p className="LeftText_Smltitle">{s.name+'：'}</p></div>
                  <div className="weui-flex__item"><p className="LeftText_Smltitle">{s.value}</p></div>
                </div>
              )}
            </div>:undefined
        }
        <div className="nocolor_panel"></div>
        <div className="weui-flex">
          <div className="weui-flex__item"><div className="divLabel">　　<img className="LabelImage" src={this.state.vippic}/>会员展示</div></div>
          <div className="weui-flex__item"><div className="divLabel">　　<img className="LabelImage" src={this.state.platpic}/>平台展示</div></div>
        </div>
        {this.props.datas.map(s =>
          <BaiduItem
            BinduserName={this.props.BinduserName}
            wxtoken={this.props.wxtoken}
            Type={this.props.Type}
            key={s.adva}
            adva={s.adva}
            cont={s.cont}
            isVIP={s.isVIP}
            isPlat={s.isPlat}
            labe={s.labe}
            user={s.user}
            compAliaName={s.compAliaName}
            textProp={s.contName}
            AddpProp={this.AddProv}
            DetailProp={this.Detail}
          />
        )}
        <div className="nocolor_panel"></div>
        <Footer Text={'如果查找不到你所需要的供应商'}/>
        <Footer Text={'请联系客服平台：微信/手机13780008543'}/>
      </div>
    )
  }
}

export default BaiduList;