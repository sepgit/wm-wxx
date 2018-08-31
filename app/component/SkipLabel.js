import React, { Component } from 'react';
import '../css/weui.css';
class SkipLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.Enable==0?
            <a className="weui-cell weui-cell_access" href="javascript:;" >
              <div className="weui-cell__bd">
                <p>{this.props.caption}</p>
              </div>
              <div className="weui-cell__ft">{this.props.text}</div>
            </a>  :
            <a className="weui-cell weui-cell_access" href="javascript:;" onClick={this.props.SelfonClick}>
              <div className="weui-cell__bd">
                <p>{this.props.caption}</p>
              </div>
              <div className="weui-cell__ft">{this.props.text}</div>
            </a>
        }
      </div>
    )
  }
}

export default SkipLabel;