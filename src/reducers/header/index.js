import {
    ACTION_HEADER_CHANGE_SELECTED_KEY
} from '../../ActionType';
const initState = {
    selectedKey: '',
};

const HeaderReducer = (state = initState, action) => {
    let newState = {};
    Object.assign(newState, state);
    switch (action.type){
        case ACTION_HEADER_CHANGE_SELECTED_KEY:
            newState.selectedKey = action.data;
            break;
    }
    return newState;
};

export default HeaderReducer