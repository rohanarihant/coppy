/*
 * @file: configureStore.prod.js
 * @description: redux configuration store.
 * @date: 27.November.2018
 * @author: Rahul
 * */
'use strict';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from '../reducers/index';


const middleware = applyMiddleware(promise(), thunk)

const enhancer = compose(
  middleware
);

const store = createStore(reducer, enhancer)

export default store;