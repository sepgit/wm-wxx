import React, { Component } from 'react';
import '../css/weui.css';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
         <p className="CenterText_Natitle">{this.props.Text}</p>
      </div>
    )
  }
}

export default Footer;