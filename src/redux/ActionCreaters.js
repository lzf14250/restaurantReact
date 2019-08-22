import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const removeComment = (comment) => ({
    type: ActionTypes.REMOVE_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, comment) => (dispatch) => {
    var bearer = 'Bearer ' + localStorage.getItem('token');
    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ':' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(comment => dispatch(addComment(comment)))
    .catch(error => {
        console.log('Post comments ', error.message);
        alert('Your comment cannot be posted \nError: '+ error.message);
    })
};

export const deleteComment = (commentId) => (dispatch) => {
    var bearer = 'Bearer ' + localStorage.getItem('token');

    fetch(baseUrl + 'comments/' + commentId, {
        method: 'DELETE',
        headers: {
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ':' + response.statusText);
            error.response = response;
            throw error;
        }
    })
    .then(response => response.json())
    .then(comment => dispatch(removeComment(comment)))
    .catch(error => alert('Failed to delete comment, \nError: '+ error.message));
};

export const fetchDishes = () => (dispatch) => {
    // return an inner function with dispatch
    
    dispatch(dishesLoading(true));

    return fetch(baseUrl+ 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl+ 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    // return an inner function with dispatch
    
    dispatch(promosLoading(true));

    return fetch(baseUrl+ 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ':' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const postFeedback = (feedback) => (dispatch) => {
    fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ':' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(feedback => alert('feedback successfully submited! \n' + JSON.stringify(feedback)))
    .catch(error => alert('could not submit the feedback'));
};

export const requestLogin = (creds) => ({
    type: ActionTypes.LOGIN_REQUEST,
    payload: creds
});

export const receiveLogin = (token) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: token
});

export const loginError = (message) => ({
    type: ActionTypes.LOGIN_FAILURE,
    payload: message
});

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds));

    fetch(baseUrl + 'users/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var err = new Error('Error:  ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    }, (err) => { throw err; })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            dispatch(fetchFavorites());
            dispatch(receiveLogin(response.token));
        }
        else {
            var err = new Error('Error: ' + response.status);
            err.response = response;
            throw err;
        }
    })
    .catch(err => dispatch(loginError(err.message)));
};

export const signupUser = (username, password, firstname, lastname) => {
    var user = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname
    };

    fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var err = new Error('Error:  ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    }, (err) => {throw err})
    .then(response => response.json())
    .then(register => {
        if (register.err) {
            alert(register.err);
        }
        else if(register.success) {
            alert(register.status);
        }
    })
    .catch(err => alert(err.message));
};

export const requestLogout = () => ({
    type: ActionTypes.LOGOUT_REQUEST
});

export const receiveLogout = () => ({
    type: ActionTypes.LOGOUT_SUCCESS
});

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed('404, No authentication!'));
    dispatch(receiveLogout());
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading());
    var bearer = 'Bearer ' + localStorage.getItem('token');
    
    fetch(baseUrl + 'favorites', {
        method: 'GET',
        headers: {
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var err = new Error('Error: ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    })
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(err => dispatch(favoritesFailed(err.message)));
};

export const postFavorite = (dishId) => (dispatch) => {
    console.log('Post the favorite to server');
    var bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'favorites/' + dishId, {
        method: 'POST',
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var err = new Error('Error: ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    })
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(err => dispatch(favoritesFailed(err.message)));
};

export const deleteFavorite = (dishId) => (dispatch) => {
    var bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'favorites/' + dishId, {
        method: 'DELETE',
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var err = new Error('Error: ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    })
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(err => {dispatch(favoritesFailed(err.message));console.log(err.message);});
};

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (message) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: message
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});

