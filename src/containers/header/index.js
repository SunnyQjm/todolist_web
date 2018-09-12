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
            }
        }
    },
)(HeaderComponent)