import React, { Component } from 'react';
import '../css/weui.css';
import '../css/slides.css';
import Title from  '../component/Title.js';
import Textline from  '../component/Textline.js';
import HTTPED from '../address';
// import Swiper from 'swiper'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
class Silders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LOGOPic:''
    }
  }

  componentWillMount(){
    this.setState({
      LOGOPic:HTTPED+ "image/nlogo.png"
    });
    
  }
  componentDidMount(){
    var mySwiper = new Swiper('.swiper-container', {
      direction:'vertical',
      mousewheelControl: true,
      watchSlidesProgress: true,
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev'
      // }
    })
  }

  render() {
    let srcs = HTTPED + 'images/nlogo.png';
    return (
      <div className='banner'>
        <div className='swiper-container'>
          <div className='swiper-wrapper'>
            <div className='swiper-slide'>111111</div>
            <div className='swiper-slide'>2222222</div>
            <div className='swiper-slide'>333333</div>
          </div>
          {/* <div className='swiper-button-prev' />
          <div className='swiper-button-next' /> */}
        </div>
      </div>
    )
  }
}

export default Silders;