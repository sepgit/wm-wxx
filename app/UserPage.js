import React, { Component } from 'react';
import './css/weui.css';

 class UserPage extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<div>{this.props.match.params.id}hello</div>)
  }
}
export default UserPage;