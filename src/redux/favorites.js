import * as ActionTypes from './ActionTypes';

export const Favorites = (state = {
    isLoading: false,
    favorites: null,
    errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.FAVORITES_LOADING:
            return {
                ...state,
                isLoading: true,
                favorites: null,
                errMess: null
            };
        
        case ActionTypes.FAVORITES_FAILED:
            return {
                ...state,
                isLoading: false,
                favorites: null,
                errMess: action.payload
            };

        case ActionTypes.ADD_FAVORITES:
            return {
                ...state,
                isLoading: false,
                favorites: action.payload,
                errMess: null
            };
            
        default:
            return state;
    }
};