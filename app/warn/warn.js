import React, { Component } from 'react';
import '../css/weui.css';
import '../css/warn.css';
import Msg from '../component/Msg.js';
import Rpath from '../Rpath.js';
import HTTPED from '../address';
import StrInput from '../component/StrInput.js';
import BackTitle from '../component/BackTitle.js';
import Title from '../component/Title.js';
import BackT from '../advantagenew/backT.js'
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv, postData, postYJData, getDataDetail ,getDataListRe} from '../DataInterface.js';

class Warn extends Component {
    constructor(props) {
        super(props);
        
        this.getBuserName = this.getBuserName.bind(this);
        this.warnLists = this.warnLists.bind(this);
        this.warnDetail = this.warnDetail.bind(this);
        this.todetail = this.todetail.bind(this);
        this.back = this.back.bind(this);
        this.last = this.last.bind(this);
        this.next = this.next.bind(this);
        
        this.paging = this.paging.bind(this);
        this.state = {
            wxtoken:'',
            BinduserName:'',
            user:'',
            warnListAll:[],
            Pagestatus:'warnMain', //warnMain 列表页  warnDetail 上榜原因页
            warningDetail:'',
            pageIndex:1,
            allPage:1,
        }
    }

    componentWillMount() {
        let wxtoken = Getwxtoken();  //获取微信ID
        this.setState({
         wxtoken: wxtoken,
        });
        getCheckbind(wxtoken, this.getBuserName);
    }
    getBuserName(value) {
        if (!value.err) {
        let userJson = value.user;
        this.setState({
            BinduserName: userJson.userAcco,
            user: userJson.user,
        });
        let pageIndex = this.state.pageIndex;
        let url = 'api/warning/?userName='+this.state.BinduserName+'&wxtoken='+this.state.wxtoken+'&rowCount=5&pageIndex='+pageIndex;
        getDataListRe(url,[] ,this.warnLists)
        }
    }
    warnLists(value) {
        console.log(value);
        let warnListAll=value.rows;
        let totalRows = value.totalRows;
        let allPage = Math.ceil(totalRows/5);
        console.log(allPage);
        this.setState({
            warnListAll:warnListAll,
            allPage:allPage
        })
    }
    todetail(e) {
        let warning = e.target.getAttribute('num')
        let url  = 'api/warning/'+ warning+'/?userName='+this.state.BinduserName+'&wxtoken='+this.state.wxtoken
        getDataDetail(url,this.warnDetail)
    }
    //详情页的信息
    warnDetail(val ){
        console.log(val);
        if (val.err == false) {
            let warning = val.warning;
            this.setState({
                warningDetail:warning,
                Pagestatus:'warnDetail',
            })
        }
    }
    back() {
        this.setState({
            Pagestatus:'warnMain',
            warningDetail:'',
        })
    }
    next() {
        let allPage = this.state.allPage;
        let pageIndex = this.state.pageIndex;
        if (pageIndex < allPage) {
            pageIndex = pageIndex +1
            let url = 'api/warning/?userName='+this.state.BinduserName+'&wxtoken='+this.state.wxtoken+'&rowCount=5&pageIndex='+pageIndex;
            getDataListRe(url,[] ,this.paging);
            this.setState({
                pageIndex:pageIndex
            })
        }
    }
    last() {
        let allPage = this.state.allPage;
        let pageIndex = this.state.pageIndex;
        if (pageIndex > 1) {
            pageIndex = pageIndex -1
            let url = 'api/warning/?userName='+this.state.BinduserName+'&wxtoken='+this.state.wxtoken+'&rowCount=5&pageIndex='+pageIndex;
            getDataListRe(url,[] ,this.paging)
            this.setState({
                pageIndex:pageIndex
            })
        }
    }
    paging(value) {
        let warnListAll=value.rows;
        this.setState({
            warnListAll:warnListAll, 
        })
    }
    warnComp() {
        let value = this.state.warnListAll;
        return value.map(s => {
            let dates = s.date;
            let time = dates.substring(0,dates.indexOf('T'));
            return <div className="warnMsg" key={s.warning} onClick={this.todetail}>
            <ul>
                <li className="clearfix">
                    <div>公司名称/个人</div>
                    <span>{s.comp}</span>	
                </li>
                <li className="clearfix">
                    <div>上榜原因</div>
                    <span className="warnReason">{s.reason}</span>	
                </li>
                <li className="clearfix">
                    <div>上榜时间</div>
                    <span>{time}</span>	
                </li>
            </ul>
            <div className="warn_source clearfix">
                <div>信息来源</div>
                <span>{s.source}</span>	
            </div>
            <div className="mengban"  num={s.warning}></div>
        </div>
            // 传递 招聘id 和 公司id
          });
    }

    render() {
        return <div>
            {
                this.state.Pagestatus == "warnMain" ?
                <div>
                    <div className="warn-tit">
                        预警名录
                    </div>
                    {
                        this.state.warnListAll.length >0?
                        this.warnComp() :undefined
                    }
                </div>:undefined
            }
            {
                this.state.Pagestatus == "warnDetail" ?
                <div>
                    <BackT tit="上榜原因" backonClick={this.back}></BackT>
                    <div className="warn_line"></div>
                    <div className="warn_compDetail">
                        <div className="warn_detail_comp">{this.state.warningDetail.comp}</div>
                        <div className="warn_detail_re">上榜原因</div>
                        <div className="warn_detail_reason">{this.state.warningDetail.reason}</div>
                    </div>
                </div>:undefined
            }
            <div id="warn_statement">免责声明：因无法联系到当事方，本网站所提供信息，仅代表信息来源者的观点。如有虚假，请联系信息来源者撤销，与本网站无关。</div>
            <ul className="warn_paging">
                <li onClick={this.last}>上一页</li>
                <li>{this.state.pageIndex}/{this.state.allPage}</li>
                <li onClick={this.next}>下一页</li>
            </ul>
        </div>
    }
}

export default Warn;