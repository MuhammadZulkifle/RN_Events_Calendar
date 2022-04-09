import React, { useContext, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FileViewer from 'react-native-file-viewer';

import { responsiveFontSize } from 'react-native-responsive-dimensions';

import styles from './styles'

export default EventCard = (props) => {
    let {data , deleteHandler ,  editHandler} = props;
    console.log("data " , data);

    const openFile = (uri) => {
      //  console.log(props.eventDoc);
    //    return;
        FileViewer.open(uri)
            .then(() => {
                console.log('Success');
            })
            .catch(_err => {
                console.log(_err);
            });
    }

    return (
        <View style={styles.cardView} >
            <View style={styles.titleView} >
                <Text style={styles.titleText} >
                    {data?.eventTitle}
                </Text>

                <View style={styles.iconsView} >

                    <TouchableOpacity
                    onPress={()=> deleteHandler()}
                    >
                        <AntDesign
                            style={styles.deleteIcon}
                            name="delete"
                            color={'#118936'}
                            size={responsiveFontSize(3.5)}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                     onPress={()=> editHandler()}
                    >

                        <AntDesign
                            name="edit"
                            color={'#118936'}
                            size={responsiveFontSize(3.5)}
                        />

                    </TouchableOpacity>

                </View>

            </View>

            <Text style = {styles.date} >
                {data?.date}
            </Text>
            {
                (data?.description && data?.description.length >1) &&
            <Text style = {styles.description} >
                {data?.description}
            </Text>

            }
            {
                data?.docName && 

            <TouchableOpacity onPress={()=>{openFile(props.data.eventDoc.uri)}} style = {styles.documentView}>
            <FontAwesome
                name="file-pdf"
                color= '#f40f02'
                size={responsiveFontSize(3.5)}
            />

            <Text style = {styles.documentTitle} >
                {data.docName}
            </Text>
            </TouchableOpacity>

            }

        </View>
    )
}