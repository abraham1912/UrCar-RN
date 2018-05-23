
import Utils from '../utils/CommonUtil'
const baseURL = "http://218.240.21.134:8084";
//const baseURL = "http://172.16.87.90:8080";
//http://www.ur-car.com.cn:8083

function fetchAction(...props) {
    this.url = props.shift(1);
    this.options = props.shift(1);
    return fetch(this.url, Object.assign({}, this.options))
        .then((response) => {
            //console.log(response.status)
            if (response.status === 200){
                let cookie = response.headers.get('set-cookie');
                global.constants.userToken = cookie ;
                global.constants.storage.save({
                    key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
                    data: {
                        token: cookie
                    },
                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    expires: null
                });
                return response.json();
            }else if (response.status === 401){
                global.constants.isLogin = false ;
                global.constants.imageUrl = ""

            }
        });
}


export default {
    getCitys(params) {
        var apiPort = "urcarAdmin/city/queryAllCitys";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers: headers ,
            body: JSON.stringify(params)
        });
    },

       loginIn(params) {
        var apiPort = "urcarAdmin/app/login";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

    getUserInfo(params) {
        var apiPort = "urcarAdmin/app/getUserInfo";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

     loginOut(params) {
        var apiPort = "urcarAdmin/app/logout";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

     queryPermission(params) {
        var apiPort = "urcarAdmin/app/hasPermission";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

    getOperator(params) {
        var apiPort = "urcarAdmin/app/vehicle/getVehicleBusinessCount";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },
    getRepairSafeList(params) {
        var apiPort = "urcarAdmin/app/vehicle/getMaintenanceRepairCount";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

    queryAreaAlarm(params) {
        var apiPort = "urcarAdmin/app/alarm/queryAreaAlarm";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

    getSetupByAre (params) {
        var apiPort = "urcarAdmin/app/setup/getSetupByAreas";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

    queryAreaDispatchInfos (params) {
        var apiPort = "urcarAdmin/app/dispatch/queryAreaDispatchInfos";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

    queryAreaChargeWorkOrderCount (params) {
        var apiPort = "urcarAdmin/app/charge/queryAreaChargeWorkOrderCount";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

    queryAreaVehicleFault (params) {
        var apiPort = "urcarAdmin/app/fault/queryAreaVehicleFault";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

    getRepairByAreas (params) {
        var apiPort = "urcarAdmin/app/repair/getRepairByAreas";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

    getAccidentAreas (params) {
        var apiPort = "urcarAdmin/app/accident/getAccidentAreas";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

    queryAreaInfoByCityCode (params) {
        var apiPort = "urcarAdmin/app/area/queryAreaInfoByCityCode";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie' : global.constants.userToken
        }
        params["sign"] = Utils.makeReqSign(params)
        return fetchAction(`${baseURL}/${apiPort}`, {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(params)
        });
    },

};
