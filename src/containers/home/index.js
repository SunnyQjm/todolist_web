import {
    connect
} from 'react-redux'

import {
    HomeComponent
} from '../../components'

export default connect(
    (state) => {
        return {
            ...state.HomeReducer
        }
    },
    (dispatch) => {
        return {

        }
    },
) (HomeComponent)