import React, { Component } from 'react';
import '../css/weui.css';

class Radio extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label className="weui-cell weui-check__label" >
          <div className="weui-cell__bd">
            <p>{this.props.Text}</p>
          </div>
          <div className="weui-cell__ft">
            <input type="radio" className="weui-check" name={this.props.RadioName} defaultChecked={false} value={this.props.Value} onChange={this.props.Choice}/>
            <span className="weui-icon-checked"></span>
          </div>
        </label>
      </div>
    )
  }
}

export default Radio;