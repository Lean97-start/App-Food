import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index.js';

const store = createStore(rootReducer, applyMiddleware(thunk));
//creo la instancia del store al cual le vinculo el archivo reducel y además le aplico reducer-thunk para poder vincular las peticiones asíncronas de las actions al middleware.

export default store;
