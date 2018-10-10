import React from 'react';
import PropTypes from 'prop-types';
import {View,Text,TouchableHighlight,TextInput} from 'react-native';
import styles from './styles';
import color from 'color';  


const InputWithButton =  (props) => {
    const {onPress,buttonText,editable=true} = props;
    const containerStyles = [styles.container];
    const underLayColor=color(styles.$buttonBackgroundColorBase).darken(styles.$buttonBackgroundColorModifier);
    if(editable===false){
        containerStyles.push(styles.containedDisabled);
    }
    const buttonTextStyles = [styles.buttonText];
    if(props.textColor){
        buttonTextStyles.push({color:props.textColor});
    }
    return(
        <View style={containerStyles}>
        <TouchableHighlight style={styles.buttonContainer} onPress={onPress} underlayColor={underLayColor}>
             <Text style={buttonTextStyles}>{buttonText}</Text>
        </TouchableHighlight>
        <View style={styles.border}/>
        <TextInput style={styles.input} underlineColorAndroid="transparent"{...props}/>
    </View>
    );
};

InputWithButton.propTypes = {
    onPress:PropTypes.func,
    buttonText:PropTypes.string,
    editable:PropTypes.bool,
    textColor:PropTypes.string,

};


export default InputWithButton;