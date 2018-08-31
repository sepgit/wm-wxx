import HTTPED from './address';
import md5 from 'md5';

export function setCookie(cname,cvalue){
  document.cookie = cname+"="+cvalue;
}

export function getCookie(cname){
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i<ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

export function Getwxtoken (){
  //let wxtoken = getCookie("username");
  let wxtoken = 'otCoBt8-YnV2KFoyOFmAkQu5xCPo';
  return wxtoken;
}

export function getDataList(url,params,rDataList){
  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  //fetch请求
  fetch(HTTPED+url,{
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => {
      rDataList(json["rows"]);
    })
    .catch((error) => {
      alert(error);
    });
}

export function getDataJson(url,params,rDataList){
  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  //fetch请求
  fetch(HTTPED+url,{
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => {
      rDataList(json);
    })
    .catch((error) => {
      alert(error);
    });
}

export function getdistDataList(url,params,rDataList){
  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  //fetch请求
  fetch(HTTPED+url,{
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => {
      rDataList(json["rows"],json["resultAll"]);
    })
    .catch((error) => {
      alert(error);
    });
}

export function getDataDetail(url,rData){
  fetch(HTTPED+url,{
    method: "get",
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data){
        if(!data.err){
          rData(data);
        }else {
          rData(data);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function getData(url,params,rData){
  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  //fetch请求
  fetch(HTTPED + url,{
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => {
      rData(json["capt"]);
    })
    .catch((error) => {
      alert(error);
    });
}

export function postData(url,params,rData){
  if (params) {
    let paramsArray = [];
    let params = '';
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (params === '') {
      params += paramsArray.join('&')
    } else {
      params += '&' + paramsArray.join('&')
    }
  }
  //fetch请求
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  }).then(function(res) {
    if (res.ok) {
      rData(json["err"]);
      alert("Perfect! Your settings are saved.");
    } else if (res.status == 401) {
      alert("Oops! You are not authorized.");
    }
  }, function(e) {
    alert("Error submitting form!");
  });
}

export function SendAxtiveEmail(userName){
  fetch(HTTPED+'api/wmbbusers/'+userName+'/',{
    method: "put",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:"actm=true"
  }).then(function(res){
    if(res.ok){
      console.log('发邮件');
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function postRegister(userName,password,capi,capt, rData){
  fetch(HTTPED+'api/wmbbusers/',{
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:"userAcco="+userName+"&password="+md5(password).toUpperCase()+"&capi="+capi+"&capt="+capt
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data) {
        if(!data.err){
          SendAxtiveEmail(userName);
          rData(data,userName);
        }else {
          rData(data,userName);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function putbinding(userName,password,wxtoken,rData){
  fetch(HTTPED+'api/wmbbusers/'+userName+'/',{
    method: "put",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:"bindwx=true&wxtoken="+wxtoken+"&password="+md5(password).toUpperCase()
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data){
        if(!data.err){
          rData(data);
        }else {
          rData(data);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function putunbind(wxtoken,rData){
  fetch(HTTPED+'api/wmbbusers/'+wxtoken+'/',{
    method: "put",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:"unbindwx=true"
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data){
        if(!data.err){
          rData(data);
        }else {
          rData(data);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function getCheckbind(wxtoken,rData){
  fetch(HTTPED+'api/wmbbusers/'+wxtoken+'/?chkbind=true',{
    method: "get",
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data){
        if(!data.err){
          rData(data);
        }else {
          rData(data);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function getUserInfo(user,userName,wxtoken,rData){
  fetch(HTTPED+'api/wmbbusers/'+user+'/?userName='+userName+'&wxtoken='+wxtoken,{
    method: "get",
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data){
        if(!data.err){
          rData(data);
        }else {
          rData(data);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function putUserInfo(userName,wxtoken,user,name,qq,compName,compAlia,indu,port,addr,posi,phon,fax,mobi,mail,rData){
  fetch(HTTPED+'api/wmbbusers/'+user+'/',{
    method: "put",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:"userName="+userName+"&wxtoken="+wxtoken+"&name="+name+"&qq="+qq+"&compName="+compName+"&compAlia="+compAlia
    +"&indu="+indu+"&port="+port+"&addr="+addr+"&posi="+posi+"&phon="+phon+"&fax="+fax+"&mobi="+mobi+"&mail="+mail
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data){
        if(!data.err){
          rData(data);
        }else {
          rData(data);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function postProv(userName,wxtoken,serv,servOpti,port,cont,labe, rData){
  fetch(HTTPED+'api/provs/',{
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:"userName="+userName+"&wxtoken="+wxtoken+"&serv="+serv+"&servOpti="+servOpti+"&port="+port+"&cont="+cont+"&labe="+labe
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data) {
        if(!data.err){
          rData(data);
        }else {
          rData(data);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function sendActive(userAcco,rData){
  fetch(HTTPED+'api/wmbbusers/'+userAcco+'/',{
    method: "put",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:"actm=true"
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data){
        if(!data.err){
          rData(data);
        }else {
          rData(data);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function Active(userName,actiCode,rData){
  fetch(HTTPED+'api/wmbbusers/'+userName+'/',{
    method: "put",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:"acti=true&actiCode="+actiCode
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data){
        if(!data.err){
          rData(data);
        }else {
          rData(data);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}

export function postVip(userName,wxtoken, rData){
  fetch(HTTPED+'api/vips/',{
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:"userName="+userName+"&wxtoken="+wxtoken
  }).then(function(res){
    if(res.ok){
      res.json().then(function(data) {
        if(!data.err){
          rData(data);
        }else {
          rData(data);
        }
      });
    }
  }, function(e) {
    message.error("连接服务器失败，请联系管理员！");
  });
}


export function postYJData(url, params, rData) {
  let urls = '', bodys = '', urlarr = [];
  if (params) {
    urlarr = url.split('?')
    //拼接参数
    urls = urlarr[0];
    bodys = urlarr[1];
  }
  fetch( HTTPED + urls, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;  charset=UTF-8"
    },
    body: bodys
  }).then(function (res) {
   
    if (res.ok) {
      res.json().then(function (data) {
        if (!data.err) {
          rData(data);
        } else {
          rData(data);
        }
      });
    }
  }, function (e) {
    message.error("连接服务器失败，请联系管理员！");
  });

}


export function getDataListRe(url,params,rDataList){
  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  //fetch请求
  fetch(HTTPED+url,{
    method: 'GET',
  }).then((response) => response.json()).then((json) => {
      rDataList(json);
    }).catch((error) => {
      alert(error);
    });
}