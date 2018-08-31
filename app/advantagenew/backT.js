import React, { Component } from 'react';
import '../css/advantageNew.css';

class BackT extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <div className="advantage_back">
            <a className="advantage_back_icon" href="javascript:;" onClick={this.props.backonClick}>返回</a>
            {this.props.tit}<span>{this.props.tit2}</span> 
          </div>
        </div>
      )
    }
  }
  
  export default BackT;