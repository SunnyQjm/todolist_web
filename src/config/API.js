import {
    ServerConfig
} from "./server-info-config";

import thunky from 'thunky';
import axios from 'axios';
import message from 'antd/lib/message';


const TodolistAPI = {
    BASE_URL: ServerConfig.BASE_URL,

    /**
     * 获取待办事项列表
     */
    GET_TASK_LIST: {
        api: 'tasklist/',
        PARAM_PAGE: 'page',
        PARAM_PAGE_SIZE: 'page_size',
    },

    /**
     * 添加一个待办事项
     */
    ADD_TASK: {
        api: 'addTask/',
        PARAM_CONTENT: 'content',
        PARAM_TAGS: 'tags',
        PARAM_FINISHED: 'finished',
        PARAM_PRIORITY: 'priority',
        PARAM_EXPIRE_DATE: 'expire_date',
    },

    /**
     * 注册
     */
    REGISTER: {
        api: 'register/',
        PARAM_USERNAME: 'username',
        PARAM_PASSWORD: 'password',
        PARAM_EMAIL: 'email',
    },

    /**
     * 登陆
     */
    LOGIN: {
        api: 'login/',
        PARAM_USERNAME: 'username',
        PARAM_PASSWORD: 'password',
    },

    /**
     * 查看，修改，删除待办事项
     */
    TASK_DETAIL: {
        api: 'taskDetail/',
        PARAM_CONTENT: 'content',
        PARAM_TAGS: 'tags',
        PARAM_FINISHED: 'finished',
        PARAM_PRIORITY: 'priority',
        PARAM_EXPIRE_DATE: 'expire_date',
    },

    /**
     * 更新令牌
     */
    UPDATE_TOKEN: {
        api: 'updateToken/',
        PARAM_TOKEN: 'token',
    }
};


/*********************************
 * 给TodolistAPI添加一些有用的函数
 *********************************/

TodolistAPI.dealSuccess = function (res, successCb, failCb) {
    let code = parseInt(res.data.code);
    //状态玛以2开头的请求都是成功的
    let success = code >= 200 && code <= 299;
    if (!success) {       //请求失败则弹窗提示
        message.error('请求失败！');
        console.log(res.data.msg);
        !!failCb && failCb(res.data.msg);
        return;
    }

    // 如果存在额外的回调，则执行它，并将有效数据提取出来，放到回调当中
    !!successCb && successCb(res.data.data);
};


TodolistAPI.dealFail = function (err, cb, needTipError=true) {
    if(needTipError)
        message.error(err.message);
    console.log(err);

    // 如果存在额外的回调，则执行它，并将有效数据提取出来，放到回调当中
    cb && cb();
};

const getTodoListAxios = thunky(cb => {
    const instance = axios.create({
        baseURL: TodolistAPI.BASE_URL,
    });
    cb(instance);
});

export {
    getTodoListAxios,
    TodolistAPI,
}

