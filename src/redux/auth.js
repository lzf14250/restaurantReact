import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token')? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds')? JSON.parse(localStorage.getItem('creds')) : null,
    errMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.payload
            };

        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                token: action.payload,
                errMess: ''
            };

        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.payload
            };

        case ActionTypes.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true
            };

        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            };

        case ActionTypes.LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: localStorage.getItem('token')? true : false,
                errMess: action.payload
            };

        default:
            return state;
    }
};