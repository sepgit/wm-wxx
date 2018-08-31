import React, { Component } from 'react';
import '../css/weui.css';

class Panel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="weui-panel__bd">
                    <a href="javascript:void(0);" className="weui-media-box weui-media-box_appmsg">
                        <div className="weui-media-box__hd">
                         </div>
                        <div className="weui-media-box__bd">
                            <h4 className="weui-media-box__title">标题一</h4>
                            <p className="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}

export default Panel;