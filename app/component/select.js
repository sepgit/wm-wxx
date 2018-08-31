import React, { Component } from 'react';
import '../css/weui.css';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataList:[]
    }
  }
  componentWillMount(){
    this.state={
      dataList:this.props.datas
    }
  }
  render() {
    return (
       <div className="weui-cell__hd">
        <select className="weui-select">
          {this.state.dataList.map(s => <option value={s.serv}>{s.servName}</option>)}
        </select>
      </div>
    )
  }
}

export default Select;