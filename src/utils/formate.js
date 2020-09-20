function formatEmail(string) {
      if (!string) {
        return '';
      }
      var arr = string.split('@');
      if (arr.length == 2) {
        if (arr[0].length <= 3) {
          return arr[0] + '@' + arr[1]
        }else {
          return arr[0].slice(0,3) + '****@' + arr[1];
        }
      }else {
        return '';
      }
    }
    
    function formatMobile(string) {
      var result = '';
      if (string) {
        result = string.slice(0,3) + '****' + string.slice(-4);
      }
      return result;
    }
    
    export { formatEmail, formatMobile };