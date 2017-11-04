export default function(method, name, value) {
  if (method == 'set') {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 9999);;
    //设置失效时间
    document.cookie = escape(name) + '=' + escape(value) + ';expires=' + expireDate.toGMTString();
  } else if (method == 'get') {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }
}