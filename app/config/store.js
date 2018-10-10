import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware =[sagaMiddleware];

if(process.env.NODE_ENV === 'development'){
    middleware.push(logger);    
}
const store= createStore(reducer,applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);
export default (store);