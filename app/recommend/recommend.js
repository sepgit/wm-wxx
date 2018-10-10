import React, { Component } from 'react';
import '../css/weui.css';
import '../css/recruit.css';
import '../css/expert.css';
import Msg from '../component/Msg.js';
import Rpath from '../Rpath.js';
import HTTPED from '../address';
import StrInput from '../component/StrInput.js';
import BackTitle from '../component/BackTitle.js';
import Title from '../component/Title.js';
import BackT from '../advantagenew/backT.js';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv, postData, postYJData, getDataDetail, getDataListRe } from '../DataInterface.js';
class Recommend extends Component {
  constructor(props) {
    super(props);
    // this.getBuserName = this.getBuserName.bind(this); 
    this.recommendList = this.recommendList.bind(this);//
    this.showLists = this.showLists.bind(this);//加载专家推荐列表
    this.todetail = this.todetail.bind(this);//获得专家推荐详情
    this.recommendDetail = this.recommendDetail.bind(this);//专家推荐详情
    this.back = this.back.bind(this);
    this.torecommend = this.torecommend.bind(this);//返回首页

    this.ptAdva=this.ptAdva.bind(this);//普通运价
    this.tzAdva=this.tzAdva.bind(this);//特种运价
    this.fwCont=this.fwCont.bind(this);//服务

    this.ptlists=this.ptlists.bind(this);
    this.choosePT=this.choosePT.bind(this);
    this.ptshowlists = this.ptshowlists.bind(this);
    this.ptlast=this.ptlast.bind(this);
    this.ptnext=this.ptnext.bind(this);

    this.tzlists = this.tzlists.bind(this);
    this.chooseTZ=this.chooseTZ.bind(this);
    this.tzshowlists = this.tzshowlists.bind(this);
    this.tzlast=this.tzlast.bind(this);
    this.tznext=this.tznext.bind(this);

    this.fwlists = this.fwlists.bind(this);
    this.chooseFW=this.chooseFW.bind(this);
    this.fwshowlists = this.fwshowlists.bind(this);
    this.fwlast=this.fwlast.bind(this);
    this.fwnext=this.fwnext.bind(this);


    this.state = {
      user: 0,//用户id
      comp: 0,//公司id
      BinduserName: '', //当前用户
      wxtoken: '',
      Pagestatus: 'recommend', // recommend 专家推荐列表页  recommendDetail 具体的某个详情页面
      recommendLists:[],
      expertsDetail:'',
      type:1,// 1 是普通  2是特种 3是服务
      compDetail:[],//公司详情
      rowCount:1,
      relists:1,
      userID:'',
      //普通
      ptLists:[],
      ptAllrows:'',
      ptIndex:1,
      ptrowCount:1,
      //特种
      tzLists:[],
      tzAllrows:'',
      tzIndex:1,
      tzrowCount:1,
      //服务
      fwLists:[],
      fwAllrows:'',
      fwIndex:1,
      fwrowCount:1,
    }
  }
  componentWillMount() {
    let url = 'api/experts/?&rowCount=5&pageIndex=1';
    getDataList(url,[],this.recommendList)
  }
  recommendList(value){
      // console.log(value);
      this.setState({
        recommendLists:value,
      })
  }
  showLists() {
    let value = this.state.recommendLists;
    console.log(value)
    return value.map(datas =>{
        let ExpertHead;
        if (datas.ExpertHead != null ) {
          ExpertHead = HTTPED + datas.ExpertHead
        }else {
          ExpertHead =  HTTPED + 'images/nlogo.png';
        }
        
        return <div className="expertList" key={datas.experts} >
            <div className="expertList_left">
                <div className="expertList_logo"><img src={ExpertHead} alt="头像"/></div>
                <div className="expertList_"></div>
            </div>
            <div className="expertList_right">
                <div className="expertList_compAlia">{datas.compAlia}</div>
                <ul className="expertList_advs">
                    <li>1.{datas.adv1}</li>
                    <li>2.{datas.adv2}</li>
                    <li>3.{datas.adv3}</li>
                </ul>
                <div  className="expertList_to" onClick={this.todetail} num={datas.experts} comp={datas.comp} user={datas.user}>更多信息</div>
            </div>
        </div>
    } )
  }
  todetail(e) {
    let experts = e.target.getAttribute('num');
    let comp = e.target.getAttribute('comp');
    let user = e.target.getAttribute('user');
    this.setState({
      userID:user
    })
    let url = 'api/experts/'+ experts +'/?&rowCount=5&pageIndex=1';
    getDataListRe(url,[] ,this.recommendDetail);

    let urls = 'api/experts/comp/'+ comp +'/';
    getDataListRe(urls,[] ,this.back);

    let urlpt = 'api/experts/Adva/List/?&user='+user+'&advaType=0&rowCount=4&pageIndex'+this.state.ptIndex;
    getDataListRe(urlpt,[] ,this.ptAdva);

    let urltz = 'api/experts/Adva/List/?&user='+user+'&advaType=1&rowCount=4&pageIndex'+this.state.tzIndex;
    getDataListRe(urltz,[] ,this.tzAdva);

    let urlfw = 'api/experts/Cont/List/?&user='+user+'&rowCount=4&pageIndex'+this.state.fwIndex;
    getDataListRe(urlfw,[] ,this.fwCont);

  }
  back(b){
    // console.log(b);
    this.setState({
      compDetail:b.comp
    })
  }
  //普通运价
  ptlists(s) {
    // console.log(this.state.ptIndex);
    let user = this.state.userID;
    let urlpt = 'api/experts/Adva/List/?&user='+ user+'&advaType=0&rowCount=4&pageIndex='+s;
    getDataListRe(urlpt,[] ,this.ptAdva);
  }
  ptAdva(value) {
    // console.log(value);
    if(value.err == false ) {
      this.setState({
        ptLists:value.rows,
        ptAllrows:Math.ceil(value.totalRows/4),
        ptrowCount:value.rowCount,
      })
    }
  }
  ptshowlists() {
    let data = this.state.ptLists;
    // console.log(data);
    return data.map(datas => {
        return <li className="zj_re_lists" key={datas.adva}>
            <span>{datas.servName}</span>
            <span>{datas.depaPortName}</span>
            <span>{datas.destPortName}</span>
        </li>
    })
  }
  ptnext() {
    let ptIndex = this.state.ptIndex;
    let ptAllrows = this.state.ptAllrows;
    if(ptIndex < ptAllrows) {
      let s = ptIndex+1;
      this.setState({
        ptIndex:s,
      })
      this.ptlists(s)
    } 
  }
  ptlast() {
    let ptIndex = this.state.ptIndex;
    let ptAllrows = this.state.ptAllrows;
    if(ptIndex > 1) {
      let s = ptIndex-1
      this.setState({
        ptIndex:s
      })
      this.ptlists(s)
    }
  }
  //特种运价
  tzlists(s) {
    let user = this.state.userID;
    let urltz = 'api/experts/Adva/List/?&user='+user+'&advaType=1&rowCount=4&pageIndex='+s;
    getDataListRe(urltz,[] ,this.tzAdva);
  }
  tzAdva(value) {
    // console.log(value);
    if(value.err == false ) {
      this.setState({
        tzLists:value.rows,
        tzAllrows:Math.ceil(value.totalRows/4),
        tzrowCount:value.rowCount,
      })
    }
  }
  tzshowlists() {
    let data = this.state.tzLists;
    console.log(data);
    return data.map(datas => {
        return <li className="zj_re_lists" key={datas.adva}>
            <span>{datas.servName}</span>
            <span>{datas.depaPortName}</span>
            <span>{datas.destPortName}</span>
        </li>
    })
  }
  tznext() {
    let tzIndex = this.state.tzIndex;
    let tzAllrows = this.state.tzAllrows;
    if(tzIndex < tzAllrows) {
      let s = tzIndex+1;
      this.setState({
        tzIndex:s,
      })
      console.log(s);
      this.tzlists(s)
    } 
  }
  tzlast() {
    let tzIndex = this.state.tzIndex;
    let tzAllrows = this.state.tzAllrows;
    if(tzIndex > 1) {
      let s = tzIndex-1
      this.setState({
        tzIndex:s
      })
      this.tzlists(s)
    }
  }
  //服务
  fwlists(s) {
    let user = this.state.userID;
    let urlfw = 'api/experts/Cont/List/?&user='+user+'&rowCount=4&pageIndex='+s;
    getDataListRe(urlfw,[] ,this.fwCont);
  }
  fwCont(value) {
    // console.log(value);
    if(value.err == false ) {
      this.setState({
        fwLists:value.rows,
        fwAllrows:Math.ceil(value.totalRows/4),
        fwrowCount:value.rowCount,
      })
    }
  }
  fwshowlists() {
    let data = this.state.fwLists;

    return data.map(datas => {
        return <li className="zj_re_lists" key={datas.cont}>
            <span>{datas.servName}</span>
            <span>{datas.servOptiName}</span>
            <span>{datas.portName}</span>
        </li>
    })
  }
  fwnext() {
    let fwIndex = this.state.fwIndex;
    let fwAllrows = this.state.fwAllrows;
    if(fwIndex < fwAllrows) {
      let s = fwIndex+1;
      this.setState({
        fwIndex:s,
      })
      this.fwlists(s)
    } 
  }
  fwlast() {
    let fwIndex = this.state.fwIndex;
    let fwAllrows = this.state.fwAllrows;
    if(fwIndex > 1) {
      let s = fwIndex-1
      this.setState({
        fwIndex:s
      })
      this.fwlists(s)
    }
  }
  //
  recommendDetail(value){
    // console.log(value);
    if (value.err == false) { 
      this.setState({
        expertsDetail:value.experts,
        Pagestatus:'recommendDetail'
      })
    }
  }
  choosePT() {
    this.setState({
      type:1
    })
  }
  chooseTZ() {
    this.setState({
      type:2
    })
  }
  chooseFW() {
    this.setState({
      type:3
    })
  }
  torecommend(){
    this.setState({
      Pagestatus:'recommend',
    })
  }
  render() {
    let logo = HTTPED +'/images/ewm.png'
    return (
      <div>
        {
          this.state.Pagestatus == 'recommend' ?
          <div>
            <div>
              <div className="recruit_tit">
                <div className="r_titele text_cen">专家推荐</div>

              </div>
              <div className="paging"></div>
            </div>
            {
              this.state.recommendLists.length>0 ?
              this.showLists() :undefined
            }
          </div>
            : undefined
        }
        {
          this.state.Pagestatus == 'recommendDetail' ?
          <div>
            <div className="re_comp_detail">
                <BackT tit="" backonClick={this.torecommend} ></BackT>
                <div className="titleback"></div>
                <div className="r_titele r_titele_paddingRight">专家推荐</div>
                <div className="re_comp_compname">
                    <div className="erweima"><img src={logo} alt="logo"/></div>

                    <div className="re_comp_name r_titele_paddingRight">{this.state.expertsDetail.name}</div>
                    <div className="re_comp_name r_titele_paddingRight">{this.state.compDetail.compName}</div>
                </div>
                <div className="re_comp_tips">优势</div>
                <div>
                <div className="re_lists_title_tit">
                {
                  this.state.type == 1?
                  <span className="current">普通运价</span>:<span onClick={this.choosePT}>普通运价</span>
                }
                {
                  this.state.type == 2?
                  <span className="current">特种货运价</span>:<span onClick={this.chooseTZ}>特种货运价</span>
                }
                {
                  this.state.type == 3?
                  <span className="current">服务</span>:<span onClick={this.chooseFW}>服务</span>
                }
                            {/* <span className="current" onClick={this.choosePT}>普通运价</span>
                            <span className=""  onClick={this.choosePT}>特种货运价</span>
                            <span className=""  onClick={this.choosePT}>服务</span> */}
                        </div>
                </div>
                {
                    this.state.relists.length !=0 ?
                    <div>
                        {
                          this.state.type == 1?
                          <div className="re_lists_title">
                            <span>类型</span>
                            <span>起运地</span>
                            <span>目的地</span>
                          </div>:undefined
                        }
                        {
                          this.state.type == 2?
                          <div className="re_lists_title">
                            <span>类型</span>
                            <span>口岸</span>
                            <span></span>
                          </div>:undefined
                        }
                        {
                          this.state.type == 3?
                          <div className="re_lists_title">
                            <span>服务</span>
                            <span>具体服务</span>
                            <span>口岸</span>
                          </div>:undefined
                        }
                        {/* <ul className="re_list">
                            {
                                // this.showlists()
                            }
                            {
                                this.state.rowCount < 2?
                                <li className="re_lists"></li>:undefined
                            }
                            {
                                this.state.rowCount < 3?
                                <li className="re_lists"></li>:undefined
                            }
                            {
                                this.state.rowCount < 4?
                                <li className="re_lists"></li>:undefined
                            }
                        </ul> */}
                        {
                          this.state.type ==1?
                          <ul className="re_list">
                            {
                                 this.ptshowlists()
                            }
                            {
                                this.state.ptrowCount < 2?
                                <li className="zj_re_lists"></li>:undefined
                            }
                            {
                                this.state.ptrowCount < 3?
                                <li className="zj_re_lists"></li>:undefined
                            }
                            {
                                this.state.ptrowCount < 4?
                                <li className="zj_re_lists"></li>:undefined
                            }
                          </ul>:undefined
                        }
                        {
                          this.state.type ==2?
                          <ul className="re_list">
                            {
                                 this.tzshowlists()
                            }
                            {
                                this.state.tzrowCount < 2?
                                <li className="zj_re_lists"></li>:undefined
                            }
                            {
                                this.state.tzrowCount < 3?
                                <li className="zj_re_lists"></li>:undefined
                            }
                            {
                                this.state.tzrowCount < 4?
                                <li className="zj_re_lists"></li>:undefined
                            }
                          </ul>:undefined
                        }
                        {
                          this.state.type ==3?
                          <ul className="re_list">
                            {
                                 this.fwshowlists()
                            }
                            {
                                this.state.fwrowCount < 2?
                                <li className="zj_re_lists"></li>:undefined
                            }
                            {
                                this.state.fwrowCount < 3?
                                <li className="zj_re_lists"></li>:undefined
                            }
                            {
                                this.state.fwrowCount < 4?
                                <li className="zj_re_lists"></li>:undefined
                            }
                          </ul>:undefined
                        }
                        {
                          this.state.type ==1?
                          <div className="re_lists_paging">
                            <span onClick={this.ptlast}>上一页</span>
                            <span>{this.state.ptIndex}/{this.state.ptAllrows}</span>
                            <span onClick={this.ptnext}>下一页</span>
                          </div>:undefined
                        }
                        {
                          this.state.type ==2?
                          <div className="re_lists_paging">
                            <span onClick={this.tzlast}>上一页</span>
                            <span>{this.state.tzIndex}/{this.state.tzAllrows}</span>
                            <span onClick={this.tznext}>下一页</span>
                          </div>:undefined
                        }
                        {
                          this.state.type ==3?
                          <div className="re_lists_paging">
                            <span onClick={this.fwlast}>上一页</span>
                            <span>{this.state.fwIndex}/{this.state.fwAllrows}</span>
                            <span onClick={this.fwnext}>下一页</span>
                          </div>:undefined
                        }
                    </div> : undefined
                }
                <div className="re_comp_tips">公司简介</div>
                <div className="re_comp_msg">{this.state.compDetail.information}</div>
                <div className="re_comp_tips">联系方式</div>
                <div className="re_comp_phon">{this.state.expertsDetail.mobi}</div>
                <div className="re_comp_tips">邮箱</div>
                <div className="re_comp_phon">{this.state.compDetail.reEmail}</div>
                <div className="re_comp_tips">公司地址</div>
                <div className="re_comp_msg">{this.state.compDetail.addr}</div>
            </div>
          </div>:undefined
        }
      </div>

    )
  }
}

export default Recommend;