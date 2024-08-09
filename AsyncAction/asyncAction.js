const Redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').thunk;
const applyMiddleware = Redux.applyMiddleware;
const createStore = Redux.createStore;

const initialState = {
    loading : true,
    users : [],
    error : '',
}

const fetchUser = () => {
    return function(dispatch) {
        dispatch(FetchRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(responce => {
            const users = responce.data.map(data => data.id)
            dispatch(FetchSuccess(users));
        })
        .catch(error => {
            dispatch(FetchError(error.message));
        })
    }
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

function FetchRequest(users) {
    return {
        type : FETCH_USER_REQUEST,
        //payload : users,
    }
}
function FetchSuccess(users) {
    return {
        type : FETCH_USER_SUCCESS,
        payload : users,
    }
}

function FetchError(error) {
    return {
        type : FETCH_USER_FAILURE,
        payload : error,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_REQUEST : 
            return { 
                ...state,
                loading : true,
            }

        case FETCH_USER_SUCCESS : 
            return {
                loading : false,
                users : action.payload,
                error : '' //we aren't setting error to again empty if it's alread empty we are doing it empty for the case when we have send a request and it failed and error got message so if we make a new request then we need to reset it to empty if request is successfull.
            }

        case FETCH_USER_FAILURE : 
            return {
                loading : false,
                users : [], //eptying it for the case i it has something before from previous fetch operation
                error : action.payload
            }

        default :
            return state;
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(()=>{console.log(store.getState())});
store.dispatch(fetchUser());