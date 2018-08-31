import React, { Component } from 'react';
import '../css/weui.css';

class ClickLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a className="weui-cell weui-cell_access" href="javascript:;" onClick={this.props.SelfonClick}>
          <div className="weui-cell__bd">
            <p>{this.props.Caption}</p>
          </div>
        </a>
      </div>
    )
  }
}

export default ClickLabel;