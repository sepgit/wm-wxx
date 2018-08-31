import React, { Component } from 'react';
import '../css/weui.css';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.SelfonClick = this.SelfonClick.bind(this);
    this.state={
      ItemID:0,
      ItemCaption:''
    }
  }

  componentWillMount() {
    this.setState({
      ItemID:this.props.idProp,
      ItemCaption:this.props.captionProp
    });
  }

  SelfonClick() {
    let a = this.state.ItemID;
    let b = this.state.ItemCaption;
    this.props.SelfonClickProp(a,b);
  }

  render() {
    return (
      <div>
        <a className="weui-cell weui-cell_access" href="javascript:;" key={this.props.idProp} onClick={this.SelfonClick}>
          <div className="weui-cell__bd">
            <p>{this.props.captionProp}</p>
          </div>
        </a>
      </div>
    )
  }
}

export default ListItem;