import {takeEvery,select,call,put} from 'redux-saga/effects';
import { GET_INITIAL_CONVERSION, SWAP_CURRENCY, CHANGE_BASE_CURRENCY, CONVERSION_ERROR, CONVERSION_RESULT, CHANGE_QUOTE_CURRENCY } from '../actions/currencies';

const getLatestRate = currency => fetch(`https://api.coinmarketcap.com/v2/ticker/2634/?convert=${currency}`);

function* fetchLatestConversionRates(action){
    

    try{
         let currency = action.currency;
        
        if(currency === undefined){
         currency=yield select(state => state.currencies.baseCurrency);
        }
        console.log(currency);
         const response = yield call(getLatestRate,currency);
         const result = yield response.json();
         if(result.error){
            yield put({type:CONVERSION_ERROR,error:result.error});
         }
         else{
            yield put({type:CONVERSION_RESULT,result});
         }
    
        
    }
    catch(e){
        yield put({type:CONVERSION_ERROR,error:e.message});

    }

    
}



export default function* rootSaga(){
    yield takeEvery(GET_INITIAL_CONVERSION,fetchLatestConversionRates);
    yield takeEvery(SWAP_CURRENCY,fetchLatestConversionRates);
    yield takeEvery(CHANGE_BASE_CURRENCY,fetchLatestConversionRates);
    yield takeEvery(CHANGE_QUOTE_CURRENCY,fetchLatestConversionRates);
}