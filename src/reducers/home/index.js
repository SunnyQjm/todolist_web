import {
    ACTION_HOME_GET_TASK_LIST_FINISH,
    ACTION_HOME_BEGIN_GET_TASK_LIST,
    ACTION_HOME_CHANGE_UP_OR_DOWN,
    ACTION_HOME_CHANGE_ORDER_BY,
    ACTION_COMMON_CHANGE_LOGIN_STATE
} from '../../ActionType'
import {
    TodolistAPI
} from '../../config/API'

const initState = {
    notFinishedTasks: [],
    notFinishedTasksPage: 1,
    finishedTasks: [],
    finishedTasksPage: 1,
    expireTasks: [],
    expireTasksPage: 1,
    loading: false,

    orderBY: 'expire_date',     //默认按过期时间排序
    up: 'up',                   //默认升序排序
    isLogin: false,
    firstLoad: true,            //是否是首次加载
};

const HomeReducer = (state = initState, action) => {
    let newState = {};
    Object.assign(newState, state);
    switch (action.type) {
        case ACTION_HOME_BEGIN_GET_TASK_LIST:
            newState.loading = true;
            newState.firstLoad = false;
            break;
        case ACTION_HOME_GET_TASK_LIST_FINISH:
            newState.loading = false;
            if (action.category === TodolistAPI.GET_TASK_LIST.Category.NOT_FINISHED) {
                newState.notFinishedTasks = action.data.detail;
            } else if (action.category === TodolistAPI.GET_TASK_LIST.Category.FINISHED) {
                newState.finishedTasks = action.data.detail;
            } else if (action.category === TodolistAPI.GET_TASK_LIST.Category.EXPIRE) {
                newState.expireTasks = action.data.detail;
            }
            break;
        case ACTION_HOME_CHANGE_UP_OR_DOWN:
            newState.up = action.data;
            break;
        case ACTION_HOME_CHANGE_ORDER_BY:
            newState.orderBY = action.data;
            break;
        case ACTION_COMMON_CHANGE_LOGIN_STATE:
            newState.isLogin = action.data;
            if(newState.isLogin){

            }
            break;
    }
    return newState;
};

export default HomeReducer