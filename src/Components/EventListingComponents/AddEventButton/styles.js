import {
    StyleSheet,
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

export const styles = props =>
    StyleSheet.create({
        btnStyle: {
            marginTop: responsiveHeight(props.marginTop ? props.marginTop : 4),
            flexDirection: 'row',
            width: props.width ? responsiveHeight(props.width) : '100%',
            height: responsiveHeight(props.height ? props.height : 7.5),
            borderRadius: 4,
            backgroundColor: props.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: props.borderColor,
            borderWidth: 1,
            marginBottom: responsiveHeight(props.marginBottom ? props.marginBottom : 0),
        },

        btnText: {
            color: props.color,
            fontSize: responsiveFontSize(2.2),
            fontWeight: '500',
            textAlign: 'center',
            width: responsiveWidth(props.widthText ? props.widthText : 26),
        },
    });