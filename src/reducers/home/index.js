import {
    ACTION_HOME_GET_TASK_LIST_FINISH,
    ACTION_HOME_BEGIN_GET_TASK_LIST,
    ACTION_HOME_CHANGE_UP_OR_DOWN,
    ACTION_HOME_CHANGE_ORDER_BY,
    ACTION_COMMON_CHANGE_LOGIN_STATE,
    ACTION_HOME_ADD_TASK_SUCCESS,
    ACTION_HOME_CHANGE_PAGE,
} from '../../ActionType'
import {
    TodolistAPI
} from '../../config/API'

const initState = {
    notFinishedTasks: [],
    notFinishedTasksNextPage: 1,
    notFinishedTasksTotalPage: 1,
    notFinishedTasksTotalSize: 1,
    finishedTasks: [],
    finishedTasksNextPage: 1,
    finishedTasksTotalPage: 1,
    finishedTasksTotalSize: 1,
    expireTasks: [],
    expireTasksNextPage: 1,
    expireTasksTotalPage: 1,
    expireTasksTotalSize: 1,
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
                newState.notFinishedTasksTotalPage = action.data.totalPage;
                newState.notFinishedTasksTotalSize = action.data.totalSize;
            } else if (action.category === TodolistAPI.GET_TASK_LIST.Category.FINISHED) {
                newState.finishedTasks = action.data.detail;
                newState.finishedTasksTotalPage = action.data.totalPage;
                newState.finishedTasksTotalSize = action.data.totalSize;
            } else if (action.category === TodolistAPI.GET_TASK_LIST.Category.EXPIRE) {
                newState.expireTasks = action.data.detail;
                newState.expireTasksTotalPage = action.data.totalPage;
                newState.expireTasksTotalSize = action.data.totalSize;
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
            break;
        case ACTION_HOME_ADD_TASK_SUCCESS:          //成功添加一个待办事项
            // 将firstLoad置true，以达到刷新当前页面数据的效果
            newState.firstLoad = true;
            break;
        case ACTION_HOME_CHANGE_PAGE:
            if (action.category === TodolistAPI.GET_TASK_LIST.Category.NOT_FINISHED) {
                newState.notFinishedTasksNextPage = action.data;
            } else if (action.category === TodolistAPI.GET_TASK_LIST.Category.FINISHED) {
                newState.finishedTasksNextPage = action.data;
            } else if (action.category === TodolistAPI.GET_TASK_LIST.Category.EXPIRE) {
                newState.expireTasksNextPage = action.data;
            }
            break;
    }
    return newState;
};

export default HomeReducer