import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default styles = StyleSheet.create({
    parentView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    internalView: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: responsiveHeight(2)
        // flex : 1
    },
    titleView: {
        alignItems: "center"
    },
    timeView: {
        flexDirection: "row",
        marginTop: responsiveHeight(1)
    },
    label: {
        color: '#1e1e1e',
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
    },
    required: { color: 'red', fontWeight: '900' },
    title: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: '600',
        marginTop: responsiveHeight(2),
        color: 'black',
    },
    line: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1),
        width: '112%',
    },
    documentView: {
        //    marginTop: responsiveHeight(2),
        flexDirection: "row",
        alignItems: "center",
        alignSelf: 'flex-start',
        width: "100%"
    },
    documentTitle: {
        marginLeft: responsiveWidth(2),
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: "#1e1e1e",
      //  backgroundColor : "red",
        width : responsiveWidth(60)
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    documentViewForm: {
        borderWidth: 1,
        marginVertical: responsiveHeight(2),
        borderColor: "#ccc",
        padding: responsiveHeight(2),

    },
    removePdfView: {
        marginLeft: "auto",
       // backgroundColor : "red",
        padding : responsiveHeight(1)
    },
    removeIcon: {
        fontSize: responsiveFontSize(2.0),
        //fontWeight : "bold",
        color: "#000"
    }

});