import {
    connect
} from 'react-redux';

import {
    HomeComponent
} from '../../components';

import {
    TodolistAPI,
    getTodoListAxios
} from '../../config/API';

import {
    ACTION_HOME_GET_TASK_LIST_FINISH,
    ACTION_HOME_BEGIN_GET_TASK_LIST,
    ACTION_HOME_CHANGE_ORDER_BY,
    ACTION_HOME_CHANGE_UP_OR_DOWN,
    ACTION_HOME_BEGIN_REMOVE_TASK,
    ACTION_HOME_REMOVE_TASK_SUCCES,
    ACTION_HOME_REMOVE_TASK_FAIL,
} from '../../ActionType';


export default connect(
    (state) => {
        return {
            ...state.HomeReducer
        }
    },
    (dispatch) => {
        return {
            /**
             * 获取待办事项列表
             * @param category
             * @param orderBY
             * @param page
             * @param page_size
             */
            getTaskList: function (category, orderBY, page = 1, page_size = 10) {
                let url = `${TodolistAPI.GET_TASK_LIST.api}?${TodolistAPI.GET_TASK_LIST.PARAM_PAGE}=${page}`;
                url += `&${TodolistAPI.GET_TASK_LIST.PARAM_PAGE_SIZE}=${page_size}`;
                url += `&${TodolistAPI.GET_TASK_LIST.PARAM_ORDER_BY}=${orderBY}`;
                if (category === TodolistAPI.GET_TASK_LIST.Category.FINISHED)
                    url += `&${TodolistAPI.GET_TASK_LIST.PARAM_FINISHED}=1`;
                if (category === TodolistAPI.GET_TASK_LIST.Category.EXPIRE)
                    url += `&${TodolistAPI.GET_TASK_LIST.PARAM_EXPIRED}=1`;
                dispatch({
                    type: ACTION_HOME_BEGIN_GET_TASK_LIST
                });
                getTodoListAxios(axios => {
                    axios.get(url)
                        .then(res => {
                            TodolistAPI.dealSuccess(res, data => {
                                dispatch({
                                    type: ACTION_HOME_GET_TASK_LIST_FINISH,
                                    data: data,
                                    category: category,
                                });
                            }, err => {
                                dispatch({
                                    type: ACTION_HOME_GET_TASK_LIST_FINISH,
                                    data: [],
                                    category: category,
                                });
                            })
                        })
                        .catch(err => {
                            dispatch({
                                type: ACTION_HOME_GET_TASK_LIST_FINISH,
                                data: [],
                                category: category,
                            });
                            TodolistAPI.dealFail(err);
                        })
                })
            },
            changeOrderBy: function (orderby) {
                dispatch({
                    type: ACTION_HOME_CHANGE_ORDER_BY,
                    data: orderby,
                });
            },
            changeUpOrDown: function (upOrDown) {
                dispatch({
                    type: ACTION_HOME_CHANGE_UP_OR_DOWN,
                    data: upOrDown,
                })
            },

            /**
             * 移除待办事项
             */
            removeTask(task, success = () => {}, fail = () => {}) {
                dispatch({
                    type: ACTION_HOME_BEGIN_REMOVE_TASK,
                });
                getTodoListAxios(axios => {
                    axios.delete(`${TodolistAPI.TASK_DETAIL.api}/${task.id}`)
                        .then(res => {
                            TodolistAPI.dealSuccess(res, data => {
                                success(task);
                                dispatch({
                                    type: ACTION_HOME_REMOVE_TASK_SUCCES,
                                    data: data,
                                    extra: task
                                });
                            }, err => {
                                dispatch({
                                    type: ACTION_HOME_REMOVE_TASK_FAIL
                                });
                                fail();
                            })
                        })
                        .catch(err => {
                            dispatch({
                                type: ACTION_HOME_REMOVE_TASK_FAIL
                            });
                            fail();
                        })
                })
            }
        }
    },
)(HomeComponent)