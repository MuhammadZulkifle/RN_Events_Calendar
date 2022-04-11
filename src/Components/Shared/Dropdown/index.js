import React from 'react';
import { Text, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';

import styles from './styles';

const Dropdown = props => {
    return (
        <View>
            {props.label && (

                <View style={styles.titleView}>

                    <Text style={styles.label}>{props.label}</Text>
                    {
                        props.required && (
                            <Text style={styles.required}> * </Text>
                        )
                    }

                </View>
            )}

            <View style={props.fullWidth ? styles.fullWidthDropDownView : styles.dropDownView}>

                <ModalDropdown
                    defaultValue={props.defaultValue}
                    isFullWidth={true}
                    onSelect={e => props.onSelected(e)}
                    textStyle={styles.txtStlye}
                    dropdownStyle={props.fullWidth ? styles.fullWidthDropDown : styles.dropDown}
                    dropdownTextStyle={styles.dropDownText}
                    dropdownListProps={styles.listProps}
                    style={styles.dropdownStyle}
                    options={props.options}
                >

                    <View style={styles.itemView} >

                        <Text>
                            {props.value}
                        </Text>

                        <FontAwesome
                            style={styles.dropDownIcon}
                            name="angle-down"
                            size={responsiveFontSize(3.2)}
                            color="#ccc"
                        />

                    </View>

                </ModalDropdown>

            </View>

            {props.errorMessage ? (
                <Text style={styles.error}> {props.errorMessage} </Text>
            ) : null}


        </View>
    )
};
export default Dropdown;
