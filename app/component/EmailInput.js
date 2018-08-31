import React, { Component } from 'react';
import '../css/weui.css';

class EmailInput extends Component {
  constructor(props) {
    super(props);
    this.state= {

    }
  }

  render() {
    return (
      <div className="weui-cell">
        <div className="weui-cell__bd">
          {
            this.props.TextProp==''?
              <input className="weui-input"
                     type="email"
                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                     placeholder={this.props.promptProp}
                     onChange={this.props.updateStateProp}
              />:
            <input className="weui-input"
                   type="email"
                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                   defaultValue={this.props.TextProp}
                   placeholder={this.props.promptProp}
                   onChange={this.props.updateStateProp}
            />
          }
        </div>
      </div>
    )
  }
}

export default EmailInput;