import HeaderReducer from './header'
import FooterReducer from './footer'
import HomeReducer from './home'
import {
    combineReducers
} from 'redux'

Array.prototype.insertOrUpdateList = function (datas, judgeKey) {
    let newArray = this.slice();
    datas.forEach(data => {
        let idx = -1;
        newArray.forEach((item, index) => {
            if (item[judgeKey] === data[judgeKey])
                idx = index;
        });
        if (idx === -1) {
            newArray.push(data);
        } else {
            newArray[idx] = data;
        }
    });
    return newArray;
};

export default combineReducers({
    HeaderReducer,
    FooterReducer,
    HomeReducer,
})