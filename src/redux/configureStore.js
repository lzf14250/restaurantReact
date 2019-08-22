import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Favorites } from "./favorites";
import { Auth } from "./auth";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
import { createForms } from 'react-redux-form';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            favorites: Favorites,
            auth: Auth,
            ...createForms({ 
                // create a form with model = "feedback", 
                // and initial state = InitialFeedback
                feedback: InitialFeedback
            })
        }), 
        applyMiddleware(thunk, logger)
    );

    return store;
};