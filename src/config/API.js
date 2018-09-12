import {
    ServerConfig
} from "./server-info-config";

import thunky from 'thunky';
import axios from 'axios';


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
    }

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

