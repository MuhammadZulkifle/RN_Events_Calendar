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
     // flex : 1
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
      line : {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1),
        width: '112%',
      },
      headerView : {flexDirection : "row" , justifyContent : "space-between"}
});