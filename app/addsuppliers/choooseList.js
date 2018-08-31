import React, { Component } from 'react';
import '../css/weui.css';
import '../css/page.css';
import '../css/addsuppliers.css';
import EachCompany from "./eachCompany.js";
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv } from '../DataInterface.js';
import HTTPED from '../address';
//当用户是同一个公司的时候，将会显示的一个下拉菜单

class ChooseList extends Component {
    constructor(props) {
        super(props);
        this.getBuserName = this.getBuserName.bind(this);
        this.showClickDOM = this.showClickDOM.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.backList = this.backList.bind(this);
        this.testFun = this.testFun.bind(this);
        // this.toDetalied = this.toDetalied.bind(this);
        // this.detailedFun = this.detailedFun.bind(this);
        
        this.state = {
            compID: '',
            compAlia: '',
            user: 0,
            BinduserName: '', //当前用户
            wxtoken: '',
            Pagestatus: '',
            //value:this.value
            userlist: 1,
            comID: 'asdf',
            showORhide: false,// true show   
            num: 1,
            dpuserAcco: '',
            dpName: '',
            dpcompName: '',
            dpinduName: '',
            dpmobi: '',
            vip:0
        }
    }

    componentWillMount() {
        let wxtoken = Getwxtoken();  //获取微信ID
        this.setState({
            wxtoken: wxtoken,
        });
        getCheckbind(wxtoken, this.getBuserName);
        
    }
    componentWillReceiveProps(){
        let wxtoken = Getwxtoken(); 
        this.setState({
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
        this.getUserList()
    }

    getUserList() {
        let valueList = this.props.values;

        let id = valueList.comp
        this.setState({
            comID: id,
        })
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let url = 'api/wmbbusers/?userName=' + BinduserName + '&wxtoken=' + wxtoken + '&comp=' + id + '&rowCount=0';
        getDataList(url, [], this.backList);
    }
    backList(val) {
        console.log(val);
        this.setState({
            userlist: val
        })
        if (val.length>0) {
            let users = val[0]
            this.setState({
                vip:users.userVip
            })
        }
    }

    showClickDOM() {

        if (this.state.userlist.length >= 1) {
            return this.state.userlist.map(value => {
                return <EachCompany key={value.user} ipgp={value.compAlia} name={value.name} userAcco={value.userAcco} chooseClick={this.props.toDetalied} user={value.user} wxtoken={this.state.wxtoken} BinduserName={this.state.BinduserName}></EachCompany>
            })
        } else {
            return undefined
        }
    }

    testFun(event) {
       
        if (this.state.showORhide) {
            this.setState({
                showORhide: false,
            })
        
        }else {
            this.setState({
                showORhide: true,
            })
           
        }
    }
    // toDetalied(event) {
    //     let id = event.target.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
    //     let BinduserName = this.state.BinduserName;
    //     let wxtoken = this.state.wxtoken;
    //     let s = ''
    //     let url = 'api/wmbbusers/' + id + '/?userName=' + BinduserName + '&wxtoken=' + wxtoken;
    //     console.log(url);
    //     getUserInfo(id, BinduserName, wxtoken, this.detailedFun);
    //     this.setState({
    //         Pagestatus: 'Main',
    //     })
    // }
    // detailedFun(val) {
    //     let msg = val.user;
    //     this.setState({
    //         dpuserAcco: msg.userAcco,
    //         dpName: msg.name,
    //         dpcompName: msg.compName,
    //         dpinduName: msg.induName,
    //         dpmobi: msg.mobi
    //     });
    // }
    render() {
        let vip = HTTPED + 'images/vip.png';
        let auth = HTTPED + 'images/auth.png';
        return (
            <div>
                <div className="companyListNav" >
                    {/* CLN = companyListNav */}
                    <div className="CLN_compAlia">
                        {
                            this.state.vip == 1?
                            <img src = {vip}  alt="会员" className="CLN_compAlia_lists CLN_compAlia_img_vip" />:undefined
                        }
                        
                        <div className="CLN_compAlia_con CLN_compAlia_lists">{this.props.compAlia}</div>
                        <div className="CLN_compAlia_ID CLN_compAlia_lists">{this.props.compID}</div>
                        <div className="CLN_compAlia_arrow CLN_compAlia_lists" onClick={this.testFun}></div>
                        <div className="CLN_compAlia_lists  CLN_compAlia_img_auth"><img src={auth}  alt="公司认证"/></div>
                    </div>
                </div>
                {
                       this.state.showORhide == true ?
                       this.showClickDOM() : undefined
                }
            </div>
        )
    }

}

export default ChooseList;