import CryptoJS from 'crypto-js'
import Vue from 'vue'
import Router from '../router/index'
import cookie from 'js-cookie'

let newVue=new Vue()

function getAesString(data, key, iv) { //加密
    var key = CryptoJS.enc.Utf8.parse(key);
    //alert(key）;
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString(); //返回的是base64格式的密文
}

function getDAesString(encrypted, key, iv) { //解密
    var key = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8); //
}
let enAES = function (data) { //加密
    // let code = JSON.parse(window.sessionStorage.userInfo).encrycode;
    let code = 'AABBCCDDEEFF';
    // console.log(code)
    var key = code; //密钥
    var iv = '1234567812345678';
    var encrypted = getAesString(data, key, iv); //密文
    // var encrypted1 = CryptoJS.enc.Utf8.parse(encrypted);
    return encrypted;
}

let deAes = function (data) { //解密
    // let code = JSON.parse(window.sessionStorage.userInfo).encrycode;
    let code = 'AABBCCDDEEFF';
    // console.log(code)
    var key = code; //密钥
    var iv = '1234567812345678';
    var decryptedStr = getDAesString(data, key, iv);
    return decryptedStr;
}

let getId = function () {
    let oid = cookie.get('obNo') || ''
    // console.log(oid);
    
    if (!oid) { 
        Router.push('/login')
        return false
    }
    let id = deAes(oid)
    return id
 }
let getUsercode = function () {
    let oid = cookie.get('usercode') || ''
    if (!oid) { 
        // Router.push('/login')
        return false
    }
    let id = deAes(oid)
    return id
 }

 let getUserID = function(){
        //从外部调起,获取url中的参数
        var url = window.location.href ;             //获取当前url

            //var dz_url = url.split('#')[0];                //获取#/之前的字符串
        
            var cs = url.split('?')[1];                //获取?之后的参数字符串
           
            if(!cs)
            {
                return null;
            }
       
        
            var cs_arr = cs.split('&');                    //参数字符串分割为数组
        
            var cs={};
        
            for(var i=0;i<cs_arr.length;i++){         //遍历数组，拿到json对象
        
              cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
        
            }
           cs.appUserID = cs.appUserID.split('#')[0]
           console.log("token>>>>"+cs.appUserID)
           cookie.set("userID",cs.appUserID);
    //  console.log("dangqian===>>>>"+cs.token)  //这样就拿到了参数中的数据
}

let getUserAuthLevel = function(){
    //从外部调起,获取url中的参数
    // var url = window.location.href ;             //获取当前url

    //     //var dz_url = url.split('#')[0];                //获取#/之前的字符串
    
    //     var cs = url.split('?')[1];                //获取?之后的参数字符串
       
    //     if(!cs)
    //     {
    //         return null;
    //     }
   
    
    //     var cs_arr = cs.split('&');                    //参数字符串分割为数组
    
    //     var cs={};
    
    //     for(var i=0;i<cs_arr.length;i++){         //遍历数组，拿到json对象
    
    //       cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
    
    //     }
    //    cs.appAuthLevel = cs.appAuthLevel.split('#')[0]
    //    console.log("auth>>>>"+cs.appAuthLevel)
    //    cookie.set("userAuth",cs.appAuthLevel);
//  console.log("dangqian===>>>>"+cs.token)  //这样就拿到了参数中的数据
}


let getUserToken= function(){
    //从外部调起,获取url中的参数
    var url = window.location.href ;             //获取当前url

        //var dz_url = url.split('#')[0];                //获取#/之前的字符串
    
        var cs = url.split('?')[1];                //获取?之后的参数字符串
       
        if(!cs)
        {
            return null;
        }
   
    
        var cs_arr = cs.split('&');                    //参数字符串分割为数组
    
        var cs={};
    
        for(var i=0;i<cs_arr.length;i++){         //遍历数组，拿到json对象
    
          cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
    
        }
       cs.appUserToken = cs.appUserToken.split('#')[0]
       console.log("auth>>>>"+cs.appUserToken)
       cookie.set("userToken",cs.appUserToken);
//  console.log("dangqian===>>>>"+cs.token)  //这样就拿到了参数中的数据
}



Vue.prototype.$enAes = enAES;
Vue.prototype.$deAes = deAes;
Vue.prototype.$getId = getId;
Vue.prototype.$getUserID = getUserID;
Vue.prototype.$getAuth = getUserAuthLevel;
Vue.prototype.$getUsercode = getUsercode;
Vue.prototype.$getUserToken = getUserToken;

