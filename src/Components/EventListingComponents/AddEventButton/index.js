import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

import { styles } from './styles';

const ButtonAddEvent = props => {
    return (
        <TouchableOpacity onPress={props.handler} style={styles(props).btnStyle}>
            <>
                <AntDesign
                    style={styles(props).icon}
                    name={props.iconName}
                    size={responsiveFontSize(2.7)}
                    color={props.iconColor}
                />
            </>

            { }
            <Text style={styles(props).btnText}>{props.btnText}</Text>
        </TouchableOpacity>
    );
};

export default ButtonAddEvent;
