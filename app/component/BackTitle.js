import React, { Component } from 'react';
import '../css/weui.css';

class BackTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="title">
          <a className="Text_title" href="javascript:;" onClick={this.props.backonClick}>＜返回</a>
        </div>
      </div>
    )
  }
}

export default BackTitle;