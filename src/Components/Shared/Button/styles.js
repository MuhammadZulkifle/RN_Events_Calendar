import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default styles = props =>
    StyleSheet.create({
        btnFb: {
            marginTop: responsiveHeight(props.marginTop ? props.marginTop : 4),
            flexDirection: 'row',
            width: props.width ? responsiveWidth(props.width) : '100%',
            height: responsiveHeight(props.height ? props.height : 6.5),
            borderRadius: 4,
            backgroundColor: props.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: props.borderColor,
            borderWidth: 1,
        },
        icon: {
            paddingLeft: responsiveWidth(props.paddingLeft ? props.paddingLeft : 9),
        },
        btnText: {
            color: props.color,
            fontSize: responsiveFontSize(2.2),
            fontWeight: '500',
            textAlign: 'center',
            width: responsiveWidth(props.textWidth ? props.textWidth : 70),
        },
    });
