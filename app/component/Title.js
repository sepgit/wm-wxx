import React, { Component } from 'react';
import '../css/weui.css';

class Title extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Head_Panel">
              {
                  this.props.SML==1?
                    <p className="CenterText_Smltitle">{this.props.Titletext}</p>:
                    <p className="CenterText_title">{this.props.Titletext}</p>
              }
            </div>
        )
    }
}

export default Title;