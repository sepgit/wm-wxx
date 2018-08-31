import React, { Component } from 'react';
import '../css/weui.css';
import Button from '../component/Button.js';
import Title from '../component/Title.js';

class AuthentCRightsRights extends Component {
  constructor(props) {
    super(props);
    this.ToClick = this.ToClick.bind(this);
  }

  ToClick(){
    let a = 'Price';
    this.props.ToOtherpage(a);
  }

  render() {
    return (
      <div>
        <Title Titletext={'公司认证会员权益'}/>
        <article className="weui-article">
          <p>a.免费开通询盘和咨询的自动平台匹配功能，可以让平台内有优势的供应商收到您的需求；</p>
          <p>b.免费查询物贸BAIDU里的搜索信息，包括普通运价优势，特种运价优势，以及服务优势；</p>
          <p>c.当询盘和咨询时，免费获得自动推送的优势，高效查询和管理供应商及客户信息；</p>
          <p>d.免费帮会员在平台展示一组优势，优先展示给所有用户；</p>
          <p>e.WMBB客服开设VIP通道为会员提供各种对接和咨询服务、以及法律、纠纷方面的咨询，认证会员可查看所有已认证公司和个人的信息，并赠送公司会员十个公司内认证账号；</p>
          <p>f.在与会员的企业签定合同后，可免费开通收款宝的权限；</p>
          <p>g.可免费选一组优势作为平台自动推送，在其他用户询盘或者咨询时，自动发送推广；</p>
          <p>h.享受WMBB的平台供应商，可免费挑选一组优势，作为该优势的平台供应商，平台供应商可在平台上收到该优势的所有询盘或者咨询，方便接触到潜在客户。</p>
          <p>I.可参与每次俱乐部活动，实行AA制。</p>
        </article>
        <div className="weui-btn-area">
          <Button text={'前往付款'} buttonstyle="1" ClickProp={this.ToClick}/>
        </div>
      </div>
    )
  }
}

export default AuthentCRightsRights;