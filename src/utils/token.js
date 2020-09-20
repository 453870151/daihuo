
import md5 from 'js-md5'
export default {
    /**
     * 加密
     * */
    generateSign(){

        //约定tokenkey
        const tokenkey = 'youwin_token';
        //时间戳
        let timestamp = Date.parse(new Date())/1000;

        //32位随机md5码
        let randstr = this.generateKey();

        //三个参数进行字典序排序
        let tmparr = [timestamp,randstr,tokenkey];


		tmparr=this.ascii(tmparr)

        //拼接成一个字符串进行MD5加密
        // let tmpstr  = tmparr.join("");
        let signature = md5(tmparr);

        let sign = {
            signa_ture : signature,
            times_tamp : timestamp,
            rand_str : randstr
        };
        return sign;
    },
    /**
 * ASCII排序
 */
    ascii(obj) {
    var newkey = Object.keys(obj).sort();
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    var objStr = "";//排序后的字符串拼接
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
      objStr = objStr + newkey[i] + obj[newkey[i]];
    }
    return objStr;//返回排好序的新对象
  },



    /**
     * 获取32位随机数
     */
    randomString(min, max) {
        var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = $chars.length;
        var len = parseInt(Math.random() * (max - min + 1) + min);
        var pwd = '';
        for (var i = 0; i < len; i++) {
          //0~32的整数
          pwd += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
        }
        return pwd;
      },
      
    generateKey(){
        return md5(this.randomString(6,6));
    },
    /*
     * RC4 symmetric cipher encryption/decryption
     *
     * @license Public Domain
     * @param string key - secret key for encryption/decryption
     * @param string str - string to be encrypted/decrypted
     * @return string
     */
    rc4(key, str) {
        var s = [], j = 0, x, res = '';
        for (var i = 0; i < 256; i++) {
            s[i] = i;
        }
        for (i = 0; i < 256; i++) {
            j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
        }
        i = 0;
        j = 0;
        for (var y = 0; y < str.length; y++) {
            i = (i + 1) % 256;
            j = (j + s[i]) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
            res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
        }
        return res;
    },
    rc42( data, key){
        var seq = Array(256);//int
        var das = Array(data.length);//code of data
        for (var i = 0; i < 256; i++) {
            seq[i] = i;
            var j = (j + seq[i] + key.charCodeAt(i % key.length)) % 256;
            var temp = seq[i];
            seq[i] = seq[j];
            seq[j] = temp;
        }

        for (var i = 0; i < data.length; i++) {
            das[i] = data.charCodeAt(i)
        }

        for (var x = 0; x < das.length; x++) {
            var i = (i + 1) % 256;
            var j = (j + seq[i]) % 256;
            var temp = seq[i];
            seq[i] = seq[j];
            seq[j] = temp;
            var k = (seq[i] + (seq[j] % 256)) % 256;
            das[x] = String.fromCharCode(das[x] ^ seq[k]);
        }
        return das.join('');
    },

}