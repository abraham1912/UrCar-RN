
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';


var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

});

global.constants = {
    //http://www.ur-car.com.cn:8083
    baseUrl:'http://218.240.21.134:8084',
    storage : storage,
    userName:'请登录',
    imageUrl : "" ,//头像路径
    phone:'',
    isLogin: false,
    userToken : '',
    RESULT_OK : 0 ,
    deviceWidth:300 ,
    deviceHeight:600 ,
    paltform : 'ios',
    cityCode : "110000" , //默认北京
    cityName : '北京' ,
    citys: null,
    defaultCenter : {
        latitude : 0 ,
        longitude : 0
    },
    user : {
      userName:"" ,
      userPhone : "",

    },
  ZHENG_BEI : "1",
  DISPATCH : "2",
  CHARGE : "3",
  GU_ZHANG : "4",
  REPAIR : "5",
  Accident : "6",
  ALARM : "8",

};

