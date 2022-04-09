import { StyleSheet } from 'react-native';
import { responsiveHeight , responsiveWidth ,  responsiveFontSize } from 'react-native-responsive-dimensions';

export default styles = StyleSheet.create({
    cardView : {
        borderRadius: 10,
        paddingBottom: responsiveHeight(2),
        //flexDirection: 'row',
        marginTop: responsiveHeight(3),
        marginBottom : responsiveHeight(1),
        marginHorizontal : responsiveWidth(0.5),
        backgroundColor: '#F5F6FF',
        paddingHorizontal : responsiveHeight(2),
        shadowColor: '#000',
        flex : 1,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8.0, 
        elevation: 3,
    },
    titleView : {
        marginTop : responsiveHeight(2),
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
        width : "100%",
     },
    titleText : {
        color: '#000',
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
    },
    iconsView: {
        flexDirection : "row"
    },
    deleteIcon : {
        marginRight : responsiveWidth(2)
    },
    date : {
        marginTop : responsiveHeight(2),
        color : "#1e1e1e"
    },
    description : {
        marginVertical : responsiveHeight(1)
    },
    documentView : {
        marginTop : responsiveHeight(2),
        flexDirection : "row",
        alignItems : "center",
        alignSelf: 'flex-start',
    },
    documentTitle : {
        marginLeft : responsiveWidth(2),
        fontSize : responsiveFontSize(2),
        fontWeight : 'bold',
        color : "#1e1e1e"
    }
});