import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Index from './Index.js';
import Test from './test/Test.js';
import Register from './userinfo/Register.js';
import UserInfo from './userinfo/UserInfo.js';
import UserinfoEdit from './userinfo/UserinfoEdit.js';
import Binding from './binding/Binding.js';
import Activate from './userinfo/Activate.js';
import Rpath from './Rpath.js';
import Baidu from './baidu/Baidu.js';
import YJSearchBaidu from './baidu/YJSearchBaidu.js';
import TZSearchBaidu from './baidu/TZSearchBaidu.js';
import FWSearchBaidu from './baidu/FWSearchBaidu.js';

const routerList = (
  <Router>
    <div>
      <Route exact path={Rpath+"/"} component={Index}/>
      <Route path= {Rpath+"/register"} component={Register}/>
      <Route path= {Rpath+"/userinfo"} component={UserInfo}/>
      <Route path= {Rpath+"/userinfoedit"} component={UserinfoEdit}/>
      <Route path= {Rpath+"/binding"} component={Binding}/>
      <Route path= {Rpath+"/activate"} component={Activate}/>
      <Route path= {Rpath+"/baidu"} component={Baidu}/>
      <Route path= {Rpath+"/yjsearchbaidu"} component={YJSearchBaidu}/>
      <Route path= {Rpath+"/tzsearchbaidu"} component={TZSearchBaidu}/>
      <Route path= {Rpath+"/fwsearchbaidu"} component={FWSearchBaidu}/>
      <Route path= {Rpath+"/test"} component={Test}/>
    </div>
  </Router>
);

export default routerList;