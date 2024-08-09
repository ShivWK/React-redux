const redux = require('redux');
const reduxLogger = require('redux-logger');
//since it is an normal nodejs application not an ES6 so we cant use import here 

const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;

const BUY_CAKE = 'BUY_CAKE';
const SELL_CAKE = 'SELL CAKE';
const ICE_CREAMS = 'ICE_CREAMS';

// const action = {
//     type : BUY_CAKE,
//     info : 'First redux action'
// }

//Action creater

function buyCake(txt) {
    return {
        type : txt,
    }
}

function buyIceCreams(){
    return {
        type : ICE_CREAMS,
    }
}

const initialStateOfCake = {
    numberOfCakes : 10,
    
}

const initialStateOfIceCream = {
    numberOfIceCreams : 20,
}

function reducerOfCake(state = initialStateOfCake, action) {
    switch(action.type) {
        case BUY_CAKE :
            return { 
                ...state,
                numberOfCakes : state.numberOfCakes - 1,
            }

        case SELL_CAKE :
            return { 
                ...state, 
                numberOfCakes : state.numberOfCakes + 1,
            }
            
        default :
            return state;
    }
}

function reducerOfIceCreams(state = initialStateOfIceCream, action) {
    switch(action.type) {
        case ICE_CREAMS :
            return {
                ...state,
                numberOfIceCreams : state.numberOfIceCreams - 1,
            }

        default :
            return state;
    }
}

const RootReducer = combineReducer({
    cake : reducerOfCake,
    ice_creams : reducerOfIceCreams,
})

const store = createStore(RootReducer , applyMiddleware(logger));
console.log('initialState' , store.getState());
const unsubscribe = store.subscribe(()=>{  });
store.dispatch(buyCake(BUY_CAKE));
store.dispatch(buyCake(SELL_CAKE));
store.dispatch(buyCake(SELL_CAKE));
store.dispatch(buyIceCreams(ICE_CREAMS));
store.dispatch(buyIceCreams(ICE_CREAMS));

unsubscribe(); //why to unsbscribe from the store