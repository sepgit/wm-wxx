import React, { Component } from 'react';
import '../css/weui.css';

class HeadLine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="title">
          <p className="Text_title">{this.props.Caption}</p>
        </div>
      </div>
    )
  }
}

export default HeadLine;