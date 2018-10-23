import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StatusBar,KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux'
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import {ClearButton} from '../components/Button';
import { LastConverted,Disclaimer } from '../Text';
import { Header } from '../Header';
import { swapCurrency,changeCurrencyAmount, getInitialConversion } from '../actions/currencies';



class Home extends Component{

  static propTypes = {
    navigation:PropTypes.object,
    dispatch:PropTypes.func,
    baseCurrency:PropTypes.string,
    quoteCurrency:PropTypes.string,
    conversionRate:PropTypes.number,
    isFetching:PropTypes.bool,
    lastConvertedDate:PropTypes.object,
    primaryColor:PropTypes.string,

  } 
  componentWillMount(){
    this.props.dispatch(getInitialConversion());
  }

  handlePressBaseCurrency = () => {
    if(this.props.quoteCurrency==='XDCE')
    {
      this.props.navigation.navigate('CurrencyList',{title:'Base Currency',type:'base'});
    }
    else{
      this.props.navigation.navigate('CryptoList',{title:'Base Currency',type:'base'});
    }
  
  }

  handlePressQuoteCurrency = () => {
    
    if(this.props.quoteCurrency==='XDCE')
    {
      this.props.navigation.navigate('CryptoList',{title:'Quote Currency',type:'quote'});
    }
    else{
      this.props.navigation.navigate('CurrencyList',{title:'Quote Currency',type:'quote'});
    }
    
  }
  handleTextChange = (amount) => {
  
   this.props.dispatch(changeCurrencyAmount(amount));
  }
  handleSwapCurrency = (currency) => {
   this.props.dispatch(swapCurrency(currency));
  }
  handleOptionPress = () => {
    this.props.navigation.navigate('Options');
  }
  render(){
    let quotePrice;
    if(this.props.baseCurrency==='XDCE'){
       quotePrice = (this.props.amount * this.props.conversionRate).toFixed(6);
    }
    else{
       quotePrice = (this.props.amount / this.props.conversionRate).toFixed(6);
    }
    
    if(this.props.isFetching){
      quotePrice='...';

    }
    return(
      <Container backgroundColor={this.props.primaryColor}>
    <StatusBar translucent={true} barStyle="light-content" />
    <Header onPress={this.handleOptionPress}/>
    <KeyboardAvoidingView behavior='padding'>
    <Logo />
    <InputWithButton
    buttonText = {this.props.baseCurrency}
    onPress = {this.handlePressBaseCurrency}
    defaultValue={this.props.amount.toString()}
    keyboardType="numeric"
    decimalPrecision={true}
    onChangeText={this.handleTextChange}
    textColor={this.props.primaryColor}
    />
    <InputWithButton
    buttonText = {this.props.quoteCurrency}
    onPress = {this.handlePressQuoteCurrency}
    editable={false}
    value={quotePrice}
    textColor={this.props.primaryColor}
    />
    {/* <LastConverted
    base={this.props.quoteCurrency}
    quote={this.props.baseCurrency}
    date={this.props.lastConvertedDate}
    conversionRate={this.props.conversionRate}
    /> */}
    <ClearButton
    text="Reverse Currencies"
    onPress={() => this.handleSwapCurrency(this.props.baseCurrency)}
    />
    </KeyboardAvoidingView>
    <Disclaimer/>
  </Container>
    );
    
  }
}

const mapStateToProps = (state) => {
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;
    let conversionSelector;
    if(state.currencies.quoteCurrency=='XDCE')
    {
       conversionSelector=state.currencies.conversions[baseCurrency] || {};
    }
    else{
      conversionSelector=state.currencies.conversions[quoteCurrency] || {};
    }
    const rates = parseFloat(conversionSelector.price) || 0;
     
  
  return{
    baseCurrency,
    quoteCurrency,
    amount:state.currencies.amount,
    conversionRate:rates,
    isFetching:conversionSelector.isFetching,
    lastConvertedDate:conversionSelector.date?new Date(conversionSelector.date):new Date(),
    primaryColor:state.theme.primaryColor,
  };
};


export default connect(mapStateToProps)(Home);  