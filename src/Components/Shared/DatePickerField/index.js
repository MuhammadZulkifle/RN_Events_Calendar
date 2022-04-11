import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

const DatePickerField = props => {
  return (

    <View>
      {props.label && (
        <View style={styles.titleView}>
          <Text style={styles.label}>{props.label}</Text>
          {props.required && <Text style={styles.required}> * </Text>}
        </View>
      )}

      <View
        style={
          props.timePicker ?
            {
              ...styles.timePickerInputView,
              borderColor: props.errorMessage ? 'red' : '#ccc',
            } :
            {
              ...styles.inputView,
              borderColor: props.errorMessage ? 'red' : '#ccc',
            }

        }>
        <TouchableOpacity style={{ width: "100%" }} onPress={() => props.handler()}>

          <TextInput
            style={styles.textInput}
            value={props.value}
            placeholderTextColor="#7e7e7e"
            placeholder={props.placeholder}
            autoCorrect={false}
            editable={false}
            underlineColorAndroid="transparent" //Android > 6
            borderWidth={0} //Android > 6
          />

        </TouchableOpacity>
      </View>

      {props.errorMessage ? (
        <Text style={styles.error}> {props.errorMessage} </Text>
      ) : null}
    </View>
  );
};

export default DatePickerField;
