import {  applyMiddleware, compose,legacy_createStore } from 'redux'

import { thunk } from "redux-thunk";
import { reducers } from '../reducers';

export const store=legacy_createStore(
    reducers,
    compose(
        applyMiddleware(thunk)
    )
);