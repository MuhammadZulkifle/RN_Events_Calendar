import React from 'react';
import { Text, TouchableOpacity} from 'react-native';

import styles from './styles';

const Button = props => {
  return (
    <TouchableOpacity onPress={props.handler} style={styles(props).btnFb}>
      <Text style={styles(props).btnText}>{props.btnText}</Text>
    </TouchableOpacity>
  );
};

export default Button;
