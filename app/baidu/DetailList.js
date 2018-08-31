import React, { Component } from 'react';
import '../css/weui.css';
import CheckBox from '../component/CheckBox.js';
import Button from '../component/Button.js';
import BackTitle from '../component/BackTitle.js';

class DetailList extends Component {
  constructor(props) {
    super(props);
    this.DataonClick = this.DataonClick.bind(this);
    this.bookingonChange = this.bookingonChange.bind(this);
    this.freightonChange = this.freightonChange.bind(this);
    this.qingonChange = this.qingonChange.bind(this);
    this.shipSpaceonChange = this.shipSpaceonChange.bind(this);
    this.state={
      booking:0,
      freight:0,
      qing:0,
      shipSpace:0
    }
  }

  DataonClick() {
    let a= this.state.booking;
    let b= this.state.freight;
    let c= this.state.qing;
    let d= this.state.shipSpace;
    this.props.GetChecked(a,b,c,d);
  }

  bookingonChange(v){
    this.setState({
      booking:v
    });
  }

  freightonChange(v){
    this.setState({
      freight:v
    });
  }

  qingonChange(v){
    this.setState({
      qing:v
    });
  }

  shipSpaceonChange(v){
    this.setState({
      shipSpace:v
    });
  }

  render() {
    return (
      <div>
        <BackTitle backonClick={this.props.backprop}/>
        <div className="weui-cells weui-cells_checkbox">
          <CheckBox captionProp={'直接订舱'} SelfonChangeProp={this.bookingonChange}/>
          <CheckBox captionProp={'运价'} SelfonChangeProp={this.freightonChange}/>
          <CheckBox captionProp={'DDP/DDU'} SelfonChangeProp={this.qingonChange}/>
          <CheckBox captionProp={'舱位'} SelfonChangeProp={this.shipSpaceonChange}/>
        </div>
        <Button text={'确认'} buttonstyle="1" ClickProp={this.DataonClick}/>
      </div>
    )
  }
}

export default DetailList;