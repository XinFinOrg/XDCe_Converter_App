import {SWAP_CURRENCY,CHANGE_CURRENCY_AMOUNT,CHANGE_BASE_CURRENCY,CHANGE_QUOTE_CURRENCY, GET_INITIAL_CONVERSION, CONVERSION_RESULT, CONVERSION_ERROR} from '../actions/currencies';
const initialState = {
    baseCurrency:'USD',
    quoteCurrency:'XDCE',
    amount:100,
    conversions:{},

};


  const setConversions = (state,action) => {
    let conversion = {
        isFetching:true,
        date:'',
        rates:{},
    };
    if(state.conversions[action.currency]){
        conversion=state.conversions[action.currency];
    }
    return {
        ...state.conversions,
        [action.currency]:conversion,
    };
  };

const reducer = (state=initialState,action) => {
    switch(action.type){
        case CHANGE_CURRENCY_AMOUNT:
        return{
            ...state,
            amount:action.amount || 0,
            
        };
        case SWAP_CURRENCY:
        return{
            ...state,
            baseCurrency:state.quoteCurrency,
            quoteCurrency:state.baseCurrency,
        };
        case CHANGE_BASE_CURRENCY:
        return{
            ...state,
            baseCurrency:action.currency,
            conversions:setConversions(state,action),

        };
        case CHANGE_QUOTE_CURRENCY:
        return{
            ...state,
            quoteCurrency:action.currency,
            conversions:setConversions(state,action),
        };
        case GET_INITIAL_CONVERSION:
        return{
            ...state,
            conversions:setConversions(state,{currency:state.baseCurrency}),

        };
        case CONVERSION_RESULT:
        let bc;
        let price;
        
        if(Object.keys(action.result.data.quotes).length>1)
        {
            bc=Object.keys(action.result.data.quotes)[1];
            a = action.result.data.quotes[bc];
            price = a["price"];
            
        }
        else
        {
            bc=Object.keys(action.result.data.quotes)[0];
            a = action.result.data.quotes[bc];
            price = a["price"];
        }
        return{
            ...state,
            // baseCurrency:bc,
            conversions:{
                ...state.conversions,
                [bc]:{
                    isFetching:false,
                    price:[price],
                },
                
            }
        };
        case CONVERSION_ERROR:
        default:
        return state;
    }
};


export default reducer;