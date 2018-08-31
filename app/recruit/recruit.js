import React, { Component } from 'react';
import '../css/weui.css';
import '../css/expert.css';
import Msg from '../component/Msg.js';
import Rpath from '../Rpath.js';
import HTTPED from '../address';
import StrInput from '../component/StrInput.js';
import BackTitle from '../component/BackTitle.js';
import Title from '../component/Title.js';
import RecruitSearch from './recruitsearch.js';
import RecruitListAll from './recruitListAll.js';
import ReCompDetail from './recruitCompDetail.js';
import BackT from '../advantagenew/backT.js'
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv, postData, postYJData, getDataDetail } from '../DataInterface.js';
class Recruit extends Component {
  constructor(props) {
    super(props);
    this.toSearch = this.toSearch.bind(this);
    // this.getBuserName = this.getBuserName.bind(this);
    this.backfun = this.backfun.bind(this);
    this.backReLists = this.backReLists.bind(this);//招聘列表页面的数据
    this.pageD = this.pageD.bind(this);
    this.compDetail = this.compDetail.bind(this);
    this.backto = this.backto.bind(this);
    
    this.searchs=this.searchs.bind(this);
    
    this.state = {
      user: 0,//用户id
      comp: 0,//公司id
      BinduserName: '', //当前用户
      wxtoken: '',
      Pagestatus: 'recruit', // recruit 招聘列表页  recruitSearch 招聘搜索  compDetail 公司详情页面
      recruitmentLists: [],
      showRelists:true,//是否显示 一开始进入时的 五个列表
      recomp:"",//招聘的公司id
      reid:'',//招聘信息的id
      cityID:'',
      hiringName:"",
      salary:'',
    }
  }
  componentWillMount() {
    // let wxtoken = Getwxtoken();  //获取微信ID
    // this.setState({
    //   wxtoken: wxtoken,
    // });
    // getCheckbind(wxtoken, this.getBuserName);
    this.pageD()
  }
  // getBuserName(value) {
  //   if (!value.err) {
  //     let userJson = value.user;
  //     this.setState({
  //       BinduserName: userJson.userAcco,
  //       user: userJson.user,
  //       comp: userJson.comp,
  //     });
  //   }
  // }
  pageD(){
    let url = 'api/recruitment/?hiringName=&salary=&city=&rowCount=5&pageIndex=1';
    getDataList(url, [], this.backfun)
  }
  
  backfun(data) {
    console.log(data);
    this.setState({
      recruitmentLists: data,
      Pagestatus: 'recruit',
      showRelists:true,
    })
  }

  toSearch() {
    this.setState({
      Pagestatus: 'recruitSearch',
      showRelists:false,
    })
  }
  backReLists() {
    let value = this.state.recruitmentLists;
    let _this = this;
    return value.map(s => {
      return <RecruitListAll key={s.recruitment} thevalue={s} toDetail={_this.toCompDetail.bind(s, s.recruitment, s.comp,_this)} ></RecruitListAll>
      // 传递 招聘id 和 公司id
    });
  }
  toCompDetail(reid, comp,_this) {
    _this.setState({
      Pagestatus:'compDetail',
      showRelists:false,
      recomp:comp,
      reid:reid
    })
  }

  compDetail() {
    return <ReCompDetail backto={this.backto} comp ={this.state.recomp}  reid={this.state.reid} ></ReCompDetail>
  }
  backto() {
    this.setState({
      Pagestatus: 'recruit',
      showRelists:true,
    })
  }
  searchs(a,b,c) {
    console.log(a,b,c);
    if (a != '' &&b!= '' && c !='') {
      let url = 'api/recruitment/?hiringName='+a+'&salary='+b+'&city'+c+'=&rowCount=1&pageIndex=1';
      getDataList(url, [], this.backfun)
    }
  }
  // handleClick(e) {
  //   let hiringName= e.target.getAttribute('name');
  //   this.setState({
  //     hiringName:hiringName,
  //     Pagestatus : 'recruitSearch'
  //   })
  // }
  render() {
    return (
      <div>
        {
          this.state.Pagestatus == 'recruit' ?
            <div>
              <div className="recruit_tit">
                <div className="r_titele text_cen">招聘</div>
                <span className="recruit_tit_search weui-icon-search" onClick={this.toSearch}></span>
              </div>
              <div className="paging"></div>
            </div>
            : undefined
        }
        {
          this.state.Pagestatus == 'recruitSearch' ?
            <RecruitSearch backto={this.backto} searchs={this.searchs} ></RecruitSearch> : undefined
        }
        { this.state.showRelists ?
          this.backReLists():undefined
        }
        {
          this.state.Pagestatus == 'compDetail' ?
           this.compDetail() : undefined
        }

      </div>

    )
  }
}

export default Recruit;