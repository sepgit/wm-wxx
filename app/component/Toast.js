import React, { Component } from 'react';
import '../css/weui.css';

class Toast extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    setTimeout(this.props.Close, 1000);
  }

  render() {
    return (
      <div>
        {
          <div>
            <div className="weui-mask_transparent"></div>
            <div className="weui-toast">
              <i className="weui-icon-success-no-circle weui-icon_toast"></i>
              <p className="weui-toast__content">{this.props.Text}</p>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Toast;