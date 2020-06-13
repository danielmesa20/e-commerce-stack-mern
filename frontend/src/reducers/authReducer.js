import {
    USER_LOADING, USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    REGISTER_SUCCESS, REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    authenticating: false,
    user: null
};

export default function(state = initialState, action){
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                authenticating: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                authenticating: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                authenticating: false,
            };
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                authenticating: false
            };
        default:
            return state;
    }
}