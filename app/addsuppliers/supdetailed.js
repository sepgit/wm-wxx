import React, { Component } from 'react';
import '../css/weui.css';
import '../css/page.css';
import Msg from '../component/Msg.js';
import Rpath from '../Rpath.js';
import '../css/addsuppliers.css';
import { getDataList, getCheckbind, Getwxtoken } from '../DataInterface.js';
import SkipLabel from '../component/SkipLabel.js';
import StrInput from '../component/StrInput.js';
import ServList from '../advancedcomponent/ServList.js';
import PortsList from '../advancedcomponent/PortsList.js';

class Detailedpage extends Component {
    constructor(props) {
        super(props);
        // this.SelfonClick = this.SelfonClick.bind(this);
        this.ServonClick = this.ServonClick.bind(this);
        this.renderServSelect = this.renderServSelect.bind(this);
        this.getBuserName = this.getBuserName.bind(this);
        this.GetservID = this.GetservID.bind(this);
        this.back = this.back.bind(this);
        this.PortonClick = this.PortonClick.bind(this);
        
        this.GetPortID = this.GetPortID.bind(this);

        this.state = {
            user: 0,
            BinduserName: '',
            serv: 0,
            servName: '',
            backto: '',
            wxtoken: '',
            Pagestatus: 'Main',
            portName: '',
        }
    }
    componentWillMount() {
        let wxtoken = Getwxtoken();  //获取微信ID
        this.setState({
            wxtoken: wxtoken
        });
        getCheckbind(wxtoken, this.getBuserName);
    }

    getBuserName(value) {
        if (!value.err) {
            let userJson = value.user;
            this.setState({
                BinduserName: userJson.userAcco,
                user: userJson.user
            });
        }
    }
    //服务类型
    ServonClick() {
        this.setState({
            backto: 'Main',

            Pagestatus: 'Serv'
        });
    }
    back() {
        this.setState({
            Pagestatus: this.state.backto
        });
    }
    GetservID(a, b) {
        if (a > 0) {
            this.setState({
                Pagestatus: 'Main',
                serv: a,
                servName: b
            });
        }
    }
    renderServSelect() {
        return <div>
            <div className="weui-cells">
                <ServList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} servType='6' GetSelectID={this.GetservID} backprop={this.back} />
            </div>
        </div>
    }
    renderPortSelect() {
        return <div>
            <div className="weui-cells">
                <PortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetPortID} backprop={this.back} />
            </div>
        </div>
    }
    //口岸
    PortonClick(){
        if (this.state.serv>0){
          let b = this.state.Pagestatus;
          this.setState({
            backto:b,
            Pagestatus:'Port'
          });
        }
      }
      GetPortID(a,b){
        if (a>0){
          this.setState({
            Pagestatus:'Main',
            port:a,
            portName:b
          });
        }
      }
    render() {
        return (
            <div>

                {
                    this.state.Pagestatus == 'Main' ?
                    
                    <div>
                        <div className="detailed_tit">
                        <div className="detailed_back" onClick={this.testFunction}></div>
                                    新增供应商
                            </div>
                        <div className="detailed_main">
                            <div className="clearfix deta_header">
                                <div className="found">
                                    已查找到该账号
                        <span className="weui-icon-success weui-icon_msg"></span>
                                </div>
                                <div className="chooseAgain"><a href="javascript:void(0)">再次查找</a></div>
                            </div>
                            <ul className="dateList clearfix">
                                <li className="dateList_li clearfix">
                                    <div className="dateList_li_left">姓名</div>
                                    <div className="dateList_li_right">asdf阿斯多夫的asdfasdf</div>
                                </li>
                                <li className="dateList_li clearfix">
                                    <div className="dateList_li_left">公司</div>
                                    <div className="dateList_li_right"></div>
                                </li>
                                <li className="dateList_li clearfix">
                                    <div className="dateList_li_left">行业</div>
                                    <div className="dateList_li_right"></div>
                                </li>
                                <li className="dateList_li clearfix">
                                    <div className="dateList_li_left">手机</div>
                                    <div className="dateList_li_right"></div>
                                </li>
                            </ul>
                            <div className="seeLOGO">
                                <div className="seeLOGO_click"><a href="javascript:void(0)">查看LOGO / 名片</a></div>
                                <ul className="seeLOGO_ul clearfix">
                                    <li className="seeLOGO_li"></li>
                                    <li className="seeLOGO_li"></li>
                                    <li className="seeLOGO_li"></li>
                                </ul>
                            </div>
                            <div className="threeLabel">
                                {
                                    this.state.servName == '' ?
                                        <SkipLabel caption={'服务类型'} text={'请选择类型'} SelfonClick={this.ServonClick} /> :
                                        <SkipLabel caption={'服务类型'} text={this.state.servName} SelfonClick={this.ServonClick} />
                                }
                            </div>
                            <div className="threeLabel">
                            {
                                this.state.portName==''?
                                <SkipLabel caption={'口岸'} text={'请选择口岸'} SelfonClick={this.PortonClick}/>:
                                <SkipLabel caption={'口岸'} text={this.state.portName} SelfonClick={this.PortonClick}/>
                            }
                            </div>
                            <div className="threeLabel">
                                <StrInput caption={'备注'} promptProp={'请输入备注信息'} updateStateProp={this.Getlabe} />
                            </div>

                            <div className="detailed_main_btn">
                                <a href="" className="weui-btn weui-btn_mini weui-btn_primary ">完成</a>
                            </div>
                        </div>
                    </div> : undefined
                }
                {
                    this.state.Pagestatus == 'Serv' ?
                        this.renderServSelect() : undefined
                }
                {
                    this.state.Pagestatus == 'Port' ?
                        this.renderPortSelect() : undefined
                }
            </div>
        )
    }
}
export default Detailedpage;