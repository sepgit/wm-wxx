import React, { Component } from 'react';
import '../css/weui.css';
import ListItem from  './ListItem';

class List extends Component {
  constructor(props) {
    super(props);
    this.ItemonClick = this.ItemonClick.bind(this);
    this.state={
      dataList:[], //<option value={s.serv}>{s.servName}</option>
      SelectItemID:0,
      SelectItemCaption:''
    }
  }

  ItemonClick(a,b) {
    this.setState({
      SelectItemID:a,
      SelectItemCaption:b
    });
    this.props.GetSelectID(a,b);
  }

  render() {
    return (
      <div>
        {this.props.datas.map(s =>
          <ListItem key={s.serv} idProp={s.serv} captionProp={s.servName} SelfonClickProp={this.ItemonClick}/>
        )}
      </div>
    )
  }
}

export default List;