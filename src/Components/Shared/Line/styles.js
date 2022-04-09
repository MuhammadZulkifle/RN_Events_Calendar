
import {StyleSheet, View} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export default styles = StyleSheet.create({
    line: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginTop: responsiveHeight(1),
      marginBottom: responsiveHeight(1),
      width: '110%',
    },
  });
