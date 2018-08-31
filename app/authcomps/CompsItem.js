import React, { Component } from 'react';
import '../css/weui.css';
import UnEnableInput from '../component/UnEnableInput.js';
import Button from '../component/Button.js';

class CompsItem extends Component {
  constructor(props) {
    super(props);
    this.GetDetail = this.GetDetail.bind(this);
    this.renderS = this.renderS.bind(this);

    this.state={
      sjson:'',
      compAlia:'',
      certNo:'',
      name:'',
      induName:'',
      portName:'',
      chsName:'',
      Pagestatus:''
    }
  }

  componentWillMount() {
    this.setState({
      sjson:this.props.sjson,
      comp:this.props.sjson.comp,
      compAlia:this.props.sjson.compAlia,
      certNo:this.props.sjson.certNo,
      name:this.props.sjson.name,
      induName:this.props.sjson.induName,
      portName:this.props.sjson.portName,
      chsName:this.props.sjson.chsName,
      Pagestatus:'S'
    });
  }

  GetDetail(){
    let s= this.state.sjson;
    console.log('key='+s.comp);
    this.props.DetailProp(s);
  }

  renderS(){
    return  <div>
      <div className="item">
        <UnEnableInput captionProp={'公司名称：'} promptProp={'-'} textProp={this.state.compAlia}/>
        <UnEnableInput captionProp={'    姓名：'} promptProp={'-'} textProp={this.state.name}/>
        <UnEnableInput captionProp={'    行业：'} promptProp={'-'} textProp={this.state.induName}/>
        <UnEnableInput captionProp={'    口岸：'} promptProp={'-'} textProp={this.state.portName+'/'+this.state.chsName}/>
        <Button text={'详情'} buttonstyle="1" ClickProp={this.GetDetail}/>
      </div>
    </div>
  }

  render() {
    return (
      <div>
        {
          this.state.Pagestatus=='S'?
            this.renderS():undefined
        }
      </div>
    )
  }
}

export default CompsItem;