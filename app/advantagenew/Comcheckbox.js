import React, { Component } from 'react';
import '../css/weui.css';

class ComcheckBox extends Component {
  constructor(props) {
    super(props);
    this.SelfonChange = this.SelfonChange.bind(this);
    this.state={
      BoxValue:0,
    }
  }

  SelfonChange() {
    let v= this.state.BoxValue;
    if (v==0) {
      this.setState({
        BoxValue:1
      });
      console.log(1);
    }
    else{
      this.setState({
        BoxValue:0
      });
      console.log(0);
    }
    this.props.SelfonChangeProp(1-v);
  }

  render() {
    return (
      <div >
        <label className="weui-cell weui-check__label">
          <div className="weui-cell__hd">
            <input type="checkbox" className="weui-check" value={this.state.BoxValue} onChange={this.SelfonChange}/>
            <i className="weui-icon-checked"></i>
          </div>
          <div className="weui-cell__bd">
            <p>{this.props.captionProp}</p>
          </div>
        </label>
      </div>
    )
  }
}

export default ComcheckBox;