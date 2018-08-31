import React, { Component } from 'react';
import '../css/weui.css';
import '../css/page.css';
import BackTitle from '../component/BackTitle.js';

class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.renderMain = this.renderMain.bind(this);
    this.state = {
      Pagestatus:'',
      scor:this.props.scor,
      allRepl:this.props.allRepl,
      winRepl:this.props.winRepl,
      scors:this.props.scors,
    }
  }

  componentWillMount(){
    this.setState({
      Pagestatus:'Main',
    });
  }

  renderMain(){
    return  <div>
      <BackTitle backonClick={this.props.backprop}/>
      <div className="white_panel"><p className="Content_Lage">评分：{this.state.scor} （满分5星）</p></div>
      <div className="white_panel"><p className="Content_Small">评分标准：</p></div>
      <div className="white_panel"><p className="Content_Small">价格合理 舱位保障 服务优质 应急处理</p></div>
      <div className="white_panel"><p className="Content_Small">回复：{this.state.allRepl}次         中标：{this.state.winRepl}次</p></div>
      <div className="nocolor_panel"></div>
      <div className="white_panel"><p className="Content_Lage">评论</p></div>
      <div className="line">　</div>
      {this.state.scors.map(s =>
        <div>
          <div className="white_panel"><p className="Content_Small">{s.scorDet}</p></div>
          <div className="white_panel"><p className="Content_Small">{s.scorTime}</p></div>
          <div className="line">　</div>
        </div>
      )}
    </div>
  }

  render() {
    return (
      <div>
        {
          this.state.Pagestatus=='Main'?
            this.renderMain():undefined
        }
      </div>
    );
  }
}
export default Evaluate;