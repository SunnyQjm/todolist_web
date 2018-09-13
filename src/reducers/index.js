import HeaderReducer from './header'
import FooterReducer from './footer'
import HomeReducer from './home'
import {
    combineReducers
} from 'redux'

export default combineReducers({
    HeaderReducer,
    FooterReducer,
    HomeReducer,
})