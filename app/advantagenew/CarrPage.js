import React, { Component } from 'react';
import '../css/weui.css';
import BackT from './backT.js';
import SearchBar from '../component/SearchBar.js';
import ListItem from '../component/ListItem.js';
import {getDataList} from '../DataInterface.js';

class CarrPage extends Component {
    constructor(props) {
        super(props);
        this.ItemonClick = this.ItemonClick.bind(this);
        
        this.getCarrList = this.getCarrList.bind(this);
        this.getRCarrList = this.getRCarrList.bind(this);
        this.getRecentCarrList = this.getRecentCarrList.bind(this);
        this.getRRecentCarrList = this.getRRecentCarrList.bind(this);
        this.renderList = this.renderList.bind(this);
        this.SearchonChange = this.SearchonChange.bind(this);
        this.renderAll = this.renderAll.bind(this);
        this.renderHot = this.renderHot.bind(this);
        this.renderListHot = this.renderListHot.bind(this);
        this.renderListAll = this.renderListAll.bind(this);
        
        this.state = {
            CarrList: [],
            RecentCarrList: [],
            ChangeCarrList: [],
            SelectItemID: 0,
            SelectItemCaption: '',
            hot:[],
            all:[],
        }
    }
    componentWillMount() {
        this.getCarrList();
        this.getRecentCarrList();
    }

    ItemonClick(a, b) {
        this.setState({
            SelectItemID: a,
            SelectItemCaption: b
        });
        this.props.GetSelectID(a, b);
    }

    getCarrList() {
        let userName = this.props.BinduserName;
        let wxtoken = this.props.wxtoken;
        let serv = this.props.serv;
        let url = 'api/carrs/?userName=' + userName + '&wxtoken=' + wxtoken + '&rowCount=0&pageIndex=1&serv=' + serv;
        let params = [];
        getDataList(url, params, this.getRCarrList);
    }

    getRCarrList(value) {
        console.log(value);
        this.setState({
            CarrList: value,
            all:value
        });
    }

    getRecentCarrList() {
        let userName = this.props.BinduserName;
        let wxtoken = this.props.wxtoken;
        let serv = this.props.serv;
        let url = 'api/carrs/?userName=' + userName + '&wxtoken=' + wxtoken + '&rowCount=0&pageIndex=1&hot=true&serv=' + serv;
        let params = [];
        getDataList(url, params, this.getRRecentCarrList);
    }

    getRRecentCarrList(value) {
        console.log(value);
        this.setState({
            RecentCarrList: value,
            hot:value,
        });
    }

    SearchonChange(event) {
        let v = event.target.value;
        v = v.toUpperCase();
        let chv = '';
        let Ob = {};
        this.state.ChangeCarrList.splice(0, this.state.ChangeCarrList.length);
        console.log(this.state.ChangeCarrList);
        if (v != '') {
            for (let i = 0; i < this.state.CarrList.length; i++) {
                chv = this.state.CarrList[i].carrName + this.state.CarrList[i].chsName;
                chv = chv.toUpperCase();
                if (chv.indexOf(v) != -1) {
                    Ob = { carr: this.state.CarrList[i].carr, carrName: this.state.CarrList[i].carrName };
                    this.state.ChangeCarrList.push(Ob);
                }
            }
        }
        this.forceUpdate();//刷新数据
    }
    renderList() {
        let re = [];
        this.state.ChangeCarrList.length > 0 ? re = this.state.ChangeCarrList : re = this.state.RecentCarrList;
        return re.map(s => {
            return <ListItem key={s.carr} idProp={s.carr} captionProp={s.carrName} SelfonClickProp={this.ItemonClick} />
        });
    }

    renderAll() {
        let allArr = this.state.all;
        console.log(allArr);
    }
    renderHot() {
        let hotArr = this.state.hot;
        console.log(hotArr);
    }

    renderListAll() {
        let re = [];
        this.state.ChangeCarrList.length > 0 ? re = this.state.ChangeCarrList : re = this.state.all;
        return re.map(s => {
            return <ListItem key={s.carr} idProp={s.carr} captionProp={s.carrName} SelfonClickProp={this.ItemonClick} />
        });
    }
    renderListHot() {
        let re = [];
        this.state.ChangeCarrList.length > 0 ? re = this.state.ChangeCarrList : re = this.state.hot;
        return re.map(s => {
            return <ListItem key={s.carr} idProp={s.carr} captionProp={s.carrName} SelfonClickProp={this.ItemonClick} />
        });
    }
    render() {
        return (
            <div>
                <SearchBar Protext={'请输入承运商名称'} SelfonChange={this.SearchonChange} />

                <div className="carr_page_line"></div>
                
                {/* <ListItem key='0' idProp='0' captionProp={'[全选]'} SelfonClickProp={this.ItemonClick} /> */}
                <div className="carrline">最近选择承运商:</div>
                {/* {
                    this.renderList()
                } */}
                {
                    this.renderListHot()
                }
                 <div className="carrline">所有:</div>
                {
                    this.renderListAll()
                }
               
                
            </div>
        )
    }
}
export default CarrPage;