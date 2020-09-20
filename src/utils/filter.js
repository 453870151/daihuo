import Vue from 'vue'
let percent = value => {
  let a = parseFloat(value * 100)
  return a.toFixed(2) + '%'
  // return (Math.floor(value * 1000) / 1000 )*100
}
let qishu = num => {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
    }
    return newNum;
  }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) noWan = "0" + noWan;
  let res = overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
  if (num == 10) {
    return '第十期'
  }
  let pri = '第' + res + '期'
  return pri
}
let parseTime = value => {
  if (value) {
    value = value.replace(/-/g, '/');
  }
  let a = Date.parse(value)
  return a
}
let matime = value => {
  let a;
  if (value) {
    a = value.slice(0, 10);
  }
  return a
}
let star = num => {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
    }
    return newNum;
  }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) noWan = "0" + noWan;
  let res = overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
  if (num == 10) {
    return '十'
  }
  let pri = res
  return pri
}
// Vue.filter('percent',percent)
// Vue.filter('qishu',qishu)

let delz = old => {
  // console.log(old);
  let newstr = old.toString()
  var leng = newstr.length - newstr.indexOf(".") - 1
  if (newstr.indexOf(".") != -1) {
    for (let i = leng; i > 0; i--) {
      if (newstr.lastIndexOf("0") > -1 && newstr.substr(newstr.length - 1, 1) == 0) {
        var k = newstr.lastIndexOf("0");
        if (newstr.charAt(k - 1) == ".") {
          return newstr.substring(0, k - 1);
        } else {
          newstr = newstr.substring(0, k);
        }
      } else {
        return newstr;
      }
    }
  }
  return newstr;
}




let savet = value => {
  let newvalue = parseFloat(value).toFixed(2)
  return newvalue

}

let sdate = value => {
  let newvalue = value.slice(0, 10)
  return newvalue

}

export {
  percent,
  qishu,
  parseTime,
  matime,
  star,
  delz,
  savet,
  sdate
}
