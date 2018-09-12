import {
    connect
} from 'react-redux'

import {
    HeaderComponent
} from '../../components'

import {
    ACTION_HEADER_CHANGE_SELECTED_KEY
} from '../../ActionType';

export default connect(
    (state) => {
        return {
            ...state.HeaderReducer
        }
    },
    (dispatch) => {
        return {
            changeSelectedKey: (item) => {
                dispatch({
                    type: ACTION_HEADER_CHANGE_SELECTED_KEY,
                    data: item.key,
                })
            }
        }
    },
) (HeaderComponent)