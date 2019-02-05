/*
 * @file: configureStore.dev.js
 * @description: redux configuration for development.
 * @date: 27.November.2018
 * @author: Rahul
 * */

'use strict';

import {applyMiddleware, compose, createStore} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from '../reducers/index';


/* store = createStore(
     AppReducer,
     applyMiddleware(middleware),
     );*/

const loggerMiddleware = createLogger({predicate : (getState, action) => __DEV__ });

const middleware = applyMiddleware(promise(), thunk, loggerMiddleware);

const enhancer = compose(
  middleware
);

const store = createStore(reducer, enhancer);
export default store;