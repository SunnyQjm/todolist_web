import {
    getTodoListAxios,
    TodolistAPI
} from '../config/API'
import {ACTION_COMMON_CHANGE_LOGIN_STATE} from "../ActionType";
import store from '../store';
const UserManager = {
    userInfo: {},
    token: '',
};
const LocalStorageKey = {
    TOKEN: 'token',
    USER_INFO: 'user_info',
};

/**
 * 保存令牌，主要执行下面三个操作
 * 1. 保存到UserManager
 * 2. 持久化到本地
 * 3. 在axios的全局默认请求头中添加token字段，并让其值更新到最新的值
 * @param token
 */
function saveToken(token){
    UserManager.token = token;
    localStorage.setItem(LocalStorageKey.TOKEN, token);
    getTodoListAxios(axios => {
        axios.defaults.headers.get['token'] = token;
        axios.defaults.headers.post['token'] = token;
        axios.defaults.headers.put['token'] = token;
        axios.defaults.headers.delete['token'] = token;
    })
}


/**
 * 更新令牌（令牌必须有效才能取得新令牌，否则会更新失败）
 * @param token  旧令牌
 */
UserManager.updateToken = function(token) {
    return new Promise((resolve, reject) => {
        getTodoListAxios(axios => {
            let requestData = {};
            requestData[TodolistAPI.UPDATE_TOKEN.PARAM_TOKEN] = token;
            axios.post(TodolistAPI.UPDATE_TOKEN.api, requestData)
                .then(res => {
                    TodolistAPI.dealSuccess(res, data => {      //执行到此表示更新token成功
                        saveToken(data.token);
                        resolve(data);
                    }, errMsg => {
                        reject({
                            message: errMsg
                        })
                    })
                })
                .catch(err => {
                    TodolistAPI.dealFail(err, ()=> {}, false);
                    reject(err);
                })
        })
    })
};


/**
 * 用户登陆
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
UserManager.login = function(username, password) {
    return new Promise((resolve, reject) => {
        getTodoListAxios(axios => {
            let requestData = {};
            requestData[TodolistAPI.LOGIN.PARAM_USERNAME] = username;
            requestData[TodolistAPI.LOGIN.PARAM_PASSWORD] = password;
            axios.post(TodolistAPI.LOGIN.api, requestData)
                .then(res => {
                    TodolistAPI.dealSuccess(res, (data) => {          //这个回调被调用，则说明登陆成功
                        UserManager.userInfo = data.user;
                        console.log(UserManager);
                        //持久化到本地
                        localStorage.setItem(LocalStorageKey.USER_INFO, JSON.stringify(data.user));
                        saveToken(data.token);

                        store.dispatch({
                            type: ACTION_COMMON_CHANGE_LOGIN_STATE,
                            data: true,
                        })
                    });
                    resolve(res);
                })
                .catch(err => {
                    TodolistAPI.dealFail(err);
                    reject(err);
                })
        })
    })
};

/**
 * 退出登陆
 */
UserManager.logout = function () {
    UserManager.token = '';
    UserManager.userInfo = {};
    localStorage.clear();
    store.dispatch({
        type: ACTION_COMMON_CHANGE_LOGIN_STATE,
        data: false,
    })
};

/**
 * 第一次加载的时候，从localStorage中读取本地的数据
 */
function init_load_from_local_storage(){
    let localToken = localStorage.getItem(LocalStorageKey.TOKEN);
    let localUserInfo = localStorage.getItem(LocalStorageKey.USER_INFO);
    UserManager.token = !!localToken ? localToken : "";
    UserManager.userInfo = !!localUserInfo ? JSON.parse(localUserInfo) : {};

    if(!!UserManager.token){        //本地有token，则尝试去更新token，如果更新成功，则无需登陆，否则需要重新登陆
        UserManager.updateToken(UserManager.token)
            .then(data => {
                store.dispatch({
                    type: ACTION_COMMON_CHANGE_LOGIN_STATE,
                    data: true,
                });
            })
            .catch(err => {
                store.dispatch({
                    type: ACTION_COMMON_CHANGE_LOGIN_STATE,
                    data: false,
                });
            })
    }
}

init_load_from_local_storage();

export {
    UserManager,
}