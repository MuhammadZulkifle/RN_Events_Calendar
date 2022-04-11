import React from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './styles';

const TextArea = props => {

    return (
        <View>

            {props.label && (

                <View style={styles.titleView}>

                    <Text style={styles.label}>{props.label}</Text>
                    {
                        props.required && (
                            <Text style={styles.required}> * </Text>
                        )
                    }

                </View>
            )}

            <View style={{
                ...styles.inputView,
                borderColor: props.errorMessage ? 'red' : '#ccc',
            }}>

                <TextInput
                    style={styles.textInput}
                    onChangeText={value => props.handler(value)}
                    value={props.value}
                    placeholderTextColor="#7e7e7e"
                    placeholder={props.placeholder}
                    autoCorrect={false}

                    underlineColorAndroid="transparent" //Android > 6
                    borderWidth={0} //Android > 6
                />

            </View>

            {props.errorMessage ? (
                <Text style={styles.error}> {props.errorMessage} </Text>
            ) : null}

        </View>
    );
};

export default TextArea;
