'use strict';
const Details = require('../settings/reducers/details');
const Password = require('../settings/reducers/password');
const Redux = require('redux');
const User = require('../settings/reducers/user');


module.exports = Redux.createStore(
    Redux.combineReducers({
        details: Details,
        password: Password,
        user: User
    })
);
