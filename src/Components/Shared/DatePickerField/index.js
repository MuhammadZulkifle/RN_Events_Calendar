import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {width, height, totalSize} from 'react-native-dimension';

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
        <TouchableOpacity style = {{width : "100%"}} onPress={() => props.handler()}>
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

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: responsiveHeight(1),
    width: responsiveWidth(90),
    borderRadius: 6,
   },
   timePickerInputView : {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: responsiveHeight(1),
    width: responsiveWidth(40),
    borderRadius: 6,
   },
  textInput: {
    height: responsiveHeight(5.8),
    paddingVertical: 0,
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(4),
  },

  error: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1),
    color: 'red',
  },

  titleView: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1),
  },

  label: {
    color: '#1e1e1e',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },

  icon: {
    marginTop: responsiveHeight(1),
  },
  required: {color: 'red', fontWeight: '900'},
});

export default DatePickerField;
