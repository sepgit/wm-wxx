import React, { Component } from 'react';
import '../css/weui.css';

class Textline extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <p  className="CenterText_Line">{this.props.Text}</p>
        </div>
      </div>
    )
  }
}

export default Textline;