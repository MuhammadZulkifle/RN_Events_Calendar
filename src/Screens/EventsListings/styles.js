import { StyleSheet } from 'react-native';
import { responsiveHeight , responsiveWidth ,  responsiveFontSize } from 'react-native-responsive-dimensions';

export default styles = StyleSheet.create({
    parentView: {
      flex: 1,
      backgroundColor: '#fff',
    },
    internalView: {
      width: '90%',
      alignSelf: 'center',
    },
    titleView : {
        alignItems : "center"
    },
    title: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: '600',
        marginTop : responsiveHeight(2),
        color: 'black',
      },
      noEventsText : {
          fontSize : responsiveFontSize(2.5),
          fontWeight : "bold",
          color : "#1e1e1e",
      },
      noEventsView : {
          alignItems :  "center",
          marginTop : responsiveHeight(4)
      },
      line : {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1),
        width: '112%',
      },
      headerView : {flexDirection : "row" , justifyContent : "space-between"}
});