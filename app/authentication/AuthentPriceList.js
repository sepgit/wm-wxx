import React, { Component } from 'react';
import '../css/weui.css';
import Button from '../component/Button.js';
import Title from '../component/Title.js';
import UnEnableInput from '../component/UnEnableInput.js';
import Label from '../component/Label.js';
import Radio from '../component/Radio.js';

class AuthentPriceList extends Component {
  constructor(props) {
    super(props);
    this.TypeonChange = this.TypeonChange.bind(this);
    this.state = {
      Type: '',
      PriceTyep:0
    }
  }

  TypeonChange(event) {
    let a = event.target.value;
    this.setState({
      Type: a
    });
  }

  render() {
    return (
      <div>
        <Title Titletext={'认证'}/>
        <UnEnableInput captionProp={'收款方：'} promptProp={'-'} textProp={'物贸帮帮信息科技有限公司'}/>

        <div className="weui-cell">
        </div>
        <div className="weui-cell">
        </div>

        <Label text={'认证类型'}/>
        <div className="weui-cells weui-cells_radio">
          <Radio Text={'公司认证会员'} RadioName={'Type'} Value={'C'} Choice={this.TypeonChange}/>
          <Radio Text={'个人认证会员'} RadioName={'Type'} Value={'P'} Choice={this.TypeonChange}/>
          <div className="weui-cell">
          </div>
          <div className="weui-cell">
          </div>
          <Label text={'套餐'}/>
          {
            this.state.Type=='C'?
              <div>
                <UnEnableInput captionProp={''} promptProp={'-'} textProp={'¥40/月'}/>
                <UnEnableInput captionProp={''} promptProp={'-'} textProp={'¥100/季度'}/>
                <UnEnableInput captionProp={''} promptProp={'-'} textProp={'¥268/年'}/>
                <div className="weui-cells weui-cells_radio">
                  <Radio Text={'¥1688/年'} RadioName={'Price'} Value={'1'} />
                  <Radio Text={'¥2888/2年'} RadioName={'Price'} Value={'2'} />
                  <Radio Text={'¥6888/5年'} RadioName={'Price'} Value={'3'} />
                </div>
              </div>:undefined
          }
          {
            this.state.Type=='P'?
              <div>
                <div className="weui-cells weui-cells_radio">
                  <Radio Text={'¥40/月'} RadioName={'Price'} Value={'4'} />
                  <Radio Text={'¥100/季度'} RadioName={'Price'} Value={'5'} />
                  <Radio Text={'¥268/年'} RadioName={'Price'} Value={'6'} />
                </div>
                <UnEnableInput captionProp={''} promptProp={'-'} textProp={'¥1688/年'}/>
                <UnEnableInput captionProp={''} promptProp={'-'} textProp={'¥2888/2年'}/>
                <UnEnableInput captionProp={''} promptProp={'-'} textProp={'¥6888/5年'}/>
              </div>:undefined
          }
          <UnEnableInput captionProp={'支付方式：'} promptProp={'-'} textProp={'微信支付'}/>
          <div className="weui-btn-area">
            <Button text={'前往付款'} buttonstyle="1"/>
          </div>
        </div>
      </div>
    )
  }
}

export default AuthentPriceList;