import React, { Component } from 'react';
import '../css/weui.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <div className="weui-search-bar">
            <div className="weui-search-bar__box">
              <i className="weui-icon-search"></i>
              <input type="search" className="weui-search-bar__input"  placeholder={this.props.Protext} onChange={this.props.SelfonChange}/>
            </div>
        </div>

      </div>
    )
  }
}

export default SearchBar;