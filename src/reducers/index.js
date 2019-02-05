import { combineReducers } from 'redux';
import HomeScreenReducer from './HomeScreenReducer';

/*
 * @file: index.js
 * @description: To combine all reducers.
 * @date: 27.November.2018
 * @author: Rahul
 * */


const AppReducer = combineReducers({
    HomeScreenReducer,
});

export default AppReducer;