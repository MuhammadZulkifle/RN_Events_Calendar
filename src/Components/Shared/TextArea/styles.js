import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize, } from 'react-native-responsive-dimensions';

export default styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: responsiveHeight(1),
        width: responsiveWidth(90),
        borderRadius: 6,
    },

    textInput: {
        height: responsiveHeight(15),
        textAlignVertical: 'top',
        paddingVertical: 0,
        fontSize: responsiveFontSize(2),
        paddingTop: responsiveHeight(2),
        width: responsiveWidth(80),
        paddingLeft: responsiveWidth(4),
    },

    error: {
        fontSize: responsiveFontSize(2),
        marginTop: responsiveHeight(1),
        color: 'red',
    },

    titleView: {
        flexDirection: 'row',
        marginTop: responsiveHeight(3),
    },

    label: {
        color: '#1e1e1e',
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
    },

    icon: {
        marginTop: responsiveHeight(1),
    },
    required:
    {
        color: 'red',
        fontWeight: '900'
    }

});