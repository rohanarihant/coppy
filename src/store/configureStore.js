/*
 * @file: configureStore.js
 * @description: redux configuration store.
 * @date: 27.November.2018
 * @author: Rahul
 * */

'use strict';
console.log ('Enviornment ==> ',process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}