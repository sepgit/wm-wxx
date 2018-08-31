import React, { Component } from 'react';
import '../css/weui.css';
import HTTPED from '../address';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv, getDataDetail } from '../DataInterface.js';
//具体的每一个搜索到的具体的用户数据
class EachCompany extends Component {
    constructor(props) {
        super(props);
        this.getUserdeta = this.getUserdeta.bind(this);
        this.detailedFun = this.detailedFun.bind(this);
        this.state={
            user : "user",
            ipgp : "bang",
            name: 'name',
            userAcco:'userAcco',
            userVip:0,
          }
    }
    componentWillMount() {
        this.setState({
            ITuser:this.props.user,
            ituserAcco:this.props.userAcco
        });
        this.getUserdeta();
    }
    getUserdeta() {
        let userID = this.props.user;
        console.log(userID);
        let BinduserName = this.props.BinduserName;
        let wxtoken = this.props.wxtoken;
        let s = '';
        let url = 'api/wmbbusers/' + userID + '/?userName=' + BinduserName + '&wxtoken=' + wxtoken;
        console.log(url);
        getUserInfo(userID, BinduserName, wxtoken, this.detailedFun);
    }
    detailedFun(value) {
        console.log(value);
        let user = value.user;
        let vip = user.userVip;
        console.log(vip);
        this.setState({
            userVip:vip,
        })
    }
    render(){
        let vip = HTTPED + 'images/vip.png';
        
        return (
            <ul className="companyChoose clearfix">
                <li className="companyID" >{ this.props.user}</li>
                <li className="companyIcon" >
                    {
                        this.state.userVip == 1 ?
                        <img src={vip} alt="会员" className="companyIcon_img"/>:undefined                        
                    }
                    
                </li>
                <li className="companyUser">{ this.props.name }</li>
                
                {/* 公司简称 */}
                <li className="companyIPGP">{ this.props.ipgp }</li>
                <li className="companyList" onClick={this.props.chooseClick}>选择并查看</li>
            </ul>
        )
    }
}

export default EachCompany;