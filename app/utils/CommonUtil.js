
var CryptoJS = require("crypto-js");
const SECRET_KEY = "MhxzKhl"


export default  {
      makeReqSign(obj){
          if (typeof (obj) !== 'object'){
              return null;
          }
          var signKey = [];

          for(let key in obj){
              if (typeof (obj[key]) == 'string' || typeof (obj[key]) == 'number' || obj[key] == null)
                  signKey.push(key);
          }

          signKey = signKey.sort();

          var signArr = [];

          for (let key of signKey){
              if (obj[key] == null)
                  signArr.push(`${key}=`);
              else
                  signArr.push(`${key}=${obj[key]}`);
          }

          var signStr = signArr.join("&");

          signStr += `&${SECRET_KEY}`;

          var sign = CryptoJS.MD5(signStr).toString();

          //console.log(`make sign:${signStr},${sign}`);

          return sign;
      }

  }