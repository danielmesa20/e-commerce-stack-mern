import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL
} from '../actions/types';

//check token & load user
export const loadUser = () => (dispatch, getState) => {

    // User loading
    dispatch({ type: USER_LOADING });

    const URL = 'http://localhost:4000/auth/user';

    axios.get(URL, tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: AUTH_ERROR });
        });
}

//REGISTER USER
export const registerUser = (newUser) => dispatch => {

    const URL = 'http://localhost:4000/auth/signup';

    axios.post(URL, newUser)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({ type: REGISTER_FAIL });
        })
}

//LOGIN USER
export const loginUser = (user) => dispatch => {

    const URL = 'http://localhost:4000/auth/signin';
    axios.post(URL, user)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .then(() => {
            window.location = "/";
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({ type: LOGIN_FAIL });
        })
}

//LOGOUT USER
export const logout = () => {
    window.location = "/";
    return { type: LOGOUT_SUCCESS }
}

//Setup config/headers and token
export const tokenConfig = (getState) => {

    // Get token from localStorage
    const token = getState().auth.token;

    //Headers
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }

    //If token, add to headers
    if (token)
        config.headers['x-access-token'] = token;

    return config;
}