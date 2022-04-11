import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize, } from 'react-native-responsive-dimensions';

export default styles = StyleSheet.create({
    dropDownView: {
        alignItems: 'center',
        borderRadius: 4,
        marginTop: responsiveHeight(1),
        width: responsiveWidth(37),
        height: responsiveHeight(6.2),
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    fullWidthDropDownView: {
        alignItems: 'center',
        borderRadius: 4,
        marginTop: responsiveHeight(1),
        width: responsiveWidth(90),
        height: responsiveHeight(6.2),
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
    },

    txtStlye: {
        color: '#7e7e7e',
        fontSize: responsiveFontSize(2),
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
    required: {
        color: 'red',
        fontWeight: '900'
    },
    error: {
        fontSize: responsiveFontSize(2),
        marginTop: responsiveHeight(1),
        color: 'red',
    },
    dropDown: {
        width: responsiveWidth(37),
        height: responsiveHeight(23),
        marginTop: responsiveHeight(1.2),
        marginLeft: -responsiveWidth(6.2),
        fontSize: responsiveFontSize(2),
    },
    fullWidthDropDown: {
        width: responsiveWidth(90),
        height: responsiveHeight(18),
        marginTop: responsiveHeight(1.2),
        marginLeft: -responsiveWidth(6.2),
        fontSize: responsiveFontSize(2),
    },
    dropDownText: {
        fontSize: responsiveFontSize(2),
    },
    listProps: {
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dropdownStyle: {
        height: responsiveHeight(6.8),
        paddingVertical: 0,
        paddingHorizontal: responsiveWidth(3),
        justifyContent: 'center',
        fontSize: responsiveFontSize(2),
        borderRadius: 4,
        paddingLeft: responsiveWidth(6),
        width: '100%',
    },
    dropDownIcon: { marginLeft: "auto" },
    itemView: { flexDirection: "row", alignItems: "center" }
});
