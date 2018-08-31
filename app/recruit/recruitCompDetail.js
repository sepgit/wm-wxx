import React, { Component } from 'react';
import '../css/weui.css';
import '../css/recruit.css';
import Msg from '../component/Msg.js';
import Rpath from '../Rpath.js';
import HTTPED from '../address';
import StrInput from '../component/StrInput.js';
import BackTitle from '../component/BackTitle.js';
import Title from '../component/Title.js';
import RecruitSearch from './recruitsearch.js';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv, postData, postYJData, getDataDetail,getDataListRe } from '../DataInterface.js';
import BackT from '../advantagenew/backT.js';

class ReCompDetail extends Component {
    constructor(props) {
        super(props);
        this.bkFun = this.bkFun.bind(this);
        this.relistall=this.relistall.bind(this);//一个公司下 所有的招聘职位
        this.showlists = this.showlists.bind(this);
        this.relistDetail = this.relistDetail.bind(this);//点击到具体的信息
        this.relistDetailshow = this.relistDetailshow.bind(this);
        this.reshow = this.reshow.bind(this);
        this.backtogw = this.backtogw.bind(this);
        this.listShow = this.listShow.bind(this);
        this.relistallshow = this.relistallshow.bind(this);
        this.next=this.next.bind(this);
        this.last=this.last.bind(this);
        this.state = {
            comp: this.props.comp,
            reid:this.props.reid,
            // BinduserName: this.props.BinduserName,//当前用户
            // wxtoken: this.props.wxtoken,
            // logo:'',
            compArr:'',
            relists:[],
            relistDetailNum:'',
            showPage:'companyDetail',//companyDetail 公司详情  relistDetail 公司下招聘详情
            recruitmentData:'',
            pageIndex:1,
            rowCount:0,
            allpage:'',
            thepage:1,
            recompDetail:[]
        }
    } 
    componentWillMount() {
        // let userName=this.state.BinduserName;
        // let wxtoken=this.state.wxtoken;
        let comp = this.state.comp;
        let pageIndex =this.state.pageIndex;
        let url = 'api/recruitment/comp/'+comp +'/';
        getDataDetail(url, this.bkFun);
        let urls = 'api/recruitment/?comp='+this.state.comp +'&rowCount=&pageIndex='+pageIndex;
        getDataListRe(urls,[] ,this.relistall)
    }
    relistall(data) {
        console.log(data);
        let recompDetail=data.rows[0]
        if (data.rowCount <= 4) {
            this.setState({
                allpage:1,
                thepage:1,
                recompDetail:recompDetail
            })
        }else {
            let num = data.rowCount;
            let pages = num/4;
            let allpage = Math.ceil(pages)
            this.setState({
                allpage:allpage,
                recompDetail:recompDetail
            })
        }
        this.listShow(1);
        // this.bkFun(data)
    }
    listShow(thepages) {
        let urls = 'api/recruitment/?comp='+this.state.comp +'&rowCount=4&pageIndex='+thepages;
        getDataListRe(urls,[] ,this.relistallshow)
    }
    relistallshow(data) {
        this.setState({
            rowCount:data.rowCount,
            relists:data.rows,
        })
    }
    next() {
        let allpage = this.state.allpage;
        let thepage = this.state.thepage;
        if (thepage < allpage) {
            let thepages = thepage +1;
            this.setState({
                thepage : thepages,
                pageIndex:thepages,
            })
            this.listShow(thepages);
        }
    }
    last(){
        let allpage = this.state.allpage;
        let thepage = this.state.thepage;
        if (thepage >1) {
            let thepages = thepage -1;
            this.setState({
                thepage : thepages,
                pageIndex:thepages,
            })
            this.listShow(thepages);
        }
    }
    showlists() {
        let data = this.state.relists;
        // console.log(data);
        return data.map(datas => {
            return <li className="re_lists" key={datas.recruitment} onClick={this.relistDetail} num={datas.recruitment}>
                <span>{datas.hiringName}</span>
                <span>{datas.salaryName}</span>
                <span>{datas.num}</span>
            </li>
        })
    }
    relistDetail(e) {
        let num = e.target.parentNode.getAttribute('num');
        // console.log(num);
        this.setState({
            showPage:'relistDetail',
            // relistDetailNum:num,
        })
        // console.log(this.state.relistDetailNum);
        this.relistDetailshow(num)
    }
    relistDetailshow(num) {
        let recruitment =num;
        // console.log(recruitment);
        let url = 'api/recruitment/'+recruitment+'/';
        getDataDetail(url, this.reshow);
    }
    reshow(data){
        // console.log(data);
        if (!data.err) {
            let recruitment = data.recruitment;
            this.setState({
                recruitmentData:recruitment
            })
        }else {

        }
    }
    bkFun(data) {
        console.log(data);
        if (!data.err) {
            let comp = data.comp;
              this.setState({
                compArr:comp,
            })
        }else{

        }
        
    }
    backtogw() {
        this.setState({
            showPage:'companyDetail'
        })
    }
    render() {
        let dutis,requirementsinfos,experiences;
        if (this.state.recruitmentData.duti != undefined) {
            let duti = this.state.recruitmentData.duti;
            let dutiarr = duti.split(/\s/)
            dutis = dutiarr.map(x => {
                return <p>
                    {x}
                </p>
            })
        }
        if (this.state.recruitmentData.duti != undefined) {
            let requirementsinfo = this.state.recruitmentData.requirementsinfo;
            let requirementsinfoArr = requirementsinfo.split(/\s/)
            requirementsinfos = requirementsinfoArr.map(x => {
                return <p>
                    {x}
                </p>
            })
        }
        if (this.state.recruitmentData.duti != undefined) {
            let experience = this.state.recruitmentData.experience;
            let experiencearr = experience.split(/\s/)
            experiences = experiencearr.map(x => {
                return <p>
                    {x}
                </p>
            })
        }
        // console.log(this.state.logo);
        let logo = HTTPED +'/images/ewm.png'
        return (
            <div>
            {    
               this.state.showPage == 'companyDetail' ?
               <div className="re_comp_detail">
                <BackT tit="" backonClick={this.props.backto}></BackT>
                <div className="titleback"></div>
                <div className="r_titele r_titele_paddingRight">招聘详情</div>
                <div className="re_comp_compname ">
                    {/* <div className="bg"></div> */}
                    {/* <div className="re_comp_logo"><img src={this.state.logo} alt="logo"/></div> */}
                    <div className="re_comp_name r_titele_paddingRight">{this.state.compArr.compName}</div>
                    
                    <div className="erweima"><img src={logo} alt="logo"/></div>
                </div>
                <div className="re_comp_tips">招聘信息</div>
                {
                    this.state.relists.length !=0 ?
                    <div>
                        <div className="re_lists_title">
                            <span>岗位</span>
                            <span>薪资待遇</span>
                            <span>招聘人数</span>
                        </div>
                        <ul className="re_list">
                            {
                                this.showlists()
                            }
                            {
                                this.state.rowCount < 2?
                                <li className="re_listss"></li>:undefined
                            }
                            {
                                this.state.rowCount < 3?
                                <li className="re_listss"></li>:undefined
                            }
                            {
                                this.state.rowCount < 4?
                                <li className="re_listss"></li>:undefined
                            }
                        </ul>
                        <div className="re_lists_paging">
                            <span onClick={this.last}>上一页</span>
                            <span>{this.state.thepage}/{this.state.allpage}</span>
                            <span onClick={this.next}>下一页</span>
                        </div>
                    </div> : undefined
                }
                {/* {
                    this.state.compArr.information != null ?
                    <div>
                        <div className="re_comp_tips">公司简介</div>
                        <div className="re_comp_msg">{this.state.compArr.information}</div>
                    </div>
                    :undefined
                } */}
                <div className="re_comp_tips">公司简介</div>
                <div className="re_comp_msg">{this.state.compArr.information}</div>
                <div className="re_comp_tips">联系方式</div>
                <div className="re_comp_phon">{this.state.compArr.retelno}</div>
                <div className="re_comp_tips">邮箱</div>
                <div className="re_comp_phon">{this.state.compArr.reEmail}</div>
                <div className="re_comp_tips">公司地址</div>
                <div className="re_comp_msg">{this.state.compArr.addr}</div>
            </div>:undefined
            }
            {
                this.state.showPage == 'relistDetail'?
                <div className="re_position_bg">
                <BackT tit="岗位详情" backonClick={this.backtogw}></BackT>
                <div className="titleback"></div>
                    <div className="r_titele text_cen">岗位详情</div>
                    <div className="re_position_name clearfix">
                        <div>{this.state.recruitmentData.hiringName}</div>
                        <span>{this.state.recruitmentData.salaryName}</span>
                    </div>
                    <div className="re_position_comp">{this.state.recruitmentData.compName}</div>
                    <div className="re_comp_tips">招聘信息</div>
                    <ul  className="re_position_msgs">
                        {
                            this.state.recruitmentData.duti != ""?
                            <li>
                                <h3>岗位职责</h3>
                                {dutis }
                            </li>:undefined
                        }
                        {
                            this.state.recruitmentData.requirementsinfo != ""?
                            <li>
                                <h3>任职要求</h3>
                                {requirementsinfos }
                            </li>:undefined
                        }
                        {
                            this.state.recruitmentData.experience != ""?
                            <li>
                                <h3>其他事项</h3>
                                {experiences }
                            </li>:undefined
                        }
                    </ul>
                </div>:undefined
            }
            </div>
        )
    }
}

export default ReCompDetail;