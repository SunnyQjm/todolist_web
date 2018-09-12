import {
    ACTION_COMMON_CHANGE_LOGIN_STATE
} from '../../ActionType';
const initState = {
    isLogin: false,
};

const HeaderReducer = (state = initState, action) => {
    let newState = {};
    Object.assign(newState, state);
    switch (action.type){
        case ACTION_COMMON_CHANGE_LOGIN_STATE:
            newState.isLogin = action.data;
            break;
    }
    return newState;
};

export default HeaderReducer