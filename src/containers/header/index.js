import {
    connect
} from 'react-redux'
import message from 'antd/lib/message';
import {
    HeaderComponent
} from '../../components'

import {
    ACTION_HEADER_REGISTER_FINISHED,
    ACTION_HEADER_LOGIN_FINISHED,
    ACTION_HEADER_BEGIN_REGISTER,
    ACTION_HEADER_BEGIN_LOGIN,
    ACTION_COMMON_CHANGE_LOGIN_STATE,
    ACTION_HOME_BEGIN_ADD_TASK,
    ACTION_HOME_ADD_TASK_SUCCESS
} from '../../ActionType';

import {
    getTodoListAxios,
    TodolistAPI
} from '../../config/API'

import {
    UserManager
} from "../../manager/UserManager";

export default connect(
    (state) => {
        return {
            ...state.HeaderReducer
        }
    },
    (dispatch) => {
        return {
            login: (formData) => {
                dispatch({
                    type: ACTION_HEADER_BEGIN_LOGIN,
                });
                UserManager.login(formData.username, formData.password)
                    .then(res => {

                        dispatch({
                            type: ACTION_HEADER_LOGIN_FINISHED
                        });
                    })
                    .catch(err => {
                        dispatch({
                            type: ACTION_HEADER_LOGIN_FINISHED
                        });
                    });
            },
            logout: () => {
                UserManager.logout();
            },
            register: (format) => {
                console.log(format);
                if (format.password !== format.passwordAgain) {
                    message.error('两次密码输入不一致！');
                    return;
                }
                dispatch({
                    type: ACTION_HEADER_BEGIN_REGISTER,
                });
                UserManager.register(format.username, format.password)
                    .then(res => {
                        dispatch({
                            type: ACTION_HEADER_REGISTER_FINISHED
                        });
                    })
                    .catch(err => {
                        dispatch({
                            type: ACTION_HEADER_REGISTER_FINISHED
                        });
                    });
            },
            addTask: function (values) {
                let formatData = {...values};
                formatData[TodolistAPI.ADD_TASK.PARAM_EXPIRE_DATE]
                    = values[TodolistAPI.ADD_TASK.PARAM_EXPIRE_DATE].valueOf();
                formatData[TodolistAPI.ADD_TASK.PARAM_PRIORITY]
                    = parseInt(values[TodolistAPI.ADD_TASK.PARAM_PRIORITY]);
                let tags = "";
                if(!!values[TodolistAPI.ADD_TASK.PARAM_TAGS])
                    values[TodolistAPI.ADD_TASK.PARAM_TAGS].forEach(tag => {
                        tags += `${tag}, `;
                    });
                formatData[TodolistAPI.ADD_TASK.PARAM_TAGS]
                    = tags;

                dispatch({
                    type: ACTION_HOME_BEGIN_ADD_TASK
                });
                getTodoListAxios(axios => {
                    axios.post(TodolistAPI.ADD_TASK.api, formatData)
                        .then(res => {
                            TodolistAPI.dealSuccess(res, data => {
                                console.log(data);
                                dispatch({
                                    type: ACTION_HOME_ADD_TASK_SUCCESS
                                });
                            }, err => {
                            })
                        })
                        .catch(err => {
                            TodolistAPI.dealFail(err);
                        })
                })
            }
        }
    },
)(HeaderComponent)