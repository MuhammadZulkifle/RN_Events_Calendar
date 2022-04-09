import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';

import InputField from '../../Components/Shared/InputField';
import TextArea from '../../Components/Shared/TextArea';
import DatePickerField from '../../Components/Shared/DatePickerField';
import DropDown from '../../Components/Shared/Dropdown';
import Button from '../../Components/Shared/Button';

import { addNewEvent , getAllEvent } from '../../redux/actions/eventsAction'


let eventsTypes = [
    'Event',
    'Out Of Office',
    'Task'
];
export default CreateEvent = () => {
    const [eventType, setEventType] = useState('Select');
    const [eventTypeError, setEventTypeError] = useState('');

    const [eventName, setEventName] = useState('');
    const [eventNameError, setEventNameError] = useState('');

    const [description, setDescription] = useState('');
    // const [descriptionError, setDescriptionError] = useState('');

    const [eventDate, setEventDate] = useState('');
    const [eventDateError, setEventDateError] = useState('');

    const [eventStartTime, setEventStartTime] = useState('');
    const [eventStartTimeError, setEventStartTimeError] = useState('');

    const [eventEndTime, setEventEndTime] = useState('');
    const [eventEndTimeError, setEventEndTimeError] = useState('');

    const [eventDoc, setEventDoc] = useState('');


    const [timeType, setTimeType] = useState('');

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const dispatch = useDispatch();


    const eventsData = useSelector(
        state => state.eventsReducer.events
    );


    console.log("Events Data" , eventsData);

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        const currentDate = selectedDate || date;
        console.log(currentDate);
        if (mode == 'date') {
            setEventDate(currentDate);
            setEventDateError();
        }
        else {
            timeType == 'start' ? setEventStartTime(currentDate) : setEventEndTime(currentDate);
            timeType == 'start' ? setEventStartTimeError('') : setEventEndTimeError('');
        }
    };


    const selectOneFile = async () => {

        try {
            const res = await DocumentPicker.pick({

                type: [DocumentPicker.types.pdf],
                // There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });

            if (res) {
                console.log("response", res);
                console.log(res[0].uri);
                let uri = res[0].uri;

                if (Platform.OS === 'ios') {
                    // Remove 'file://' from file path for FileViewer
                    uri = res.uri.replace('file://', '');
                }

                console.log('URI : ' + uri);
                setEventDoc(res[0]);
                return;
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                alert('Canceled');
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const openFile = (uri) => {
        FileViewer.open(uri)
            .then(() => {
                console.log('Success');
            })
            .catch(_err => {
                console.log(_err);
            });
    }

    const submitHandler = () => {
        // dispatch(getAllEvent());
        // return;
        let counter = 0;
        if (eventName == "") {
            setEventNameError("Event Name is required");
            counter++;
        }
        if (eventType == 'Select') {
            setEventTypeError("Event Type is required");
            counter++;
        }
        if (eventDate == "") {
            setEventDateError("Event Date is required");
            counter++;
        }
        if (eventStartTime == "") {
            setEventStartTimeError("Start Time required");
            counter++;
        }
        if (eventEndTime == "") {
            setEventEndTimeError("End Time required");
            counter++;
        }
        if (counter == 0) {
            let event = {
                eventName,
                description,
                eventType,
                eventDate,
                eventStartTime,
                eventEndTime,
                eventDoc
            }
            console.log("Event TO Add", event);
            dispatch(addNewEvent(event));
        }

    }

    return (
        <SafeAreaView style={styles.parentView}>
            <ScrollView>
                <View style={styles.internalView}>
                    <View style={styles.titleView} >
                        <Text style={styles.title}>Create Event</Text>
                        <View style={styles.line}></View>
                    </View>

                    <InputField
                        label="Event Name"
                        required
                        placeholder="Event event name..."
                        handler={text => {
                            setEventName(text);
                            setEventNameError('');
                        }}
                        errorMessage={eventNameError}
                        value={eventName}
                    />

                    <TextArea
                        label="Event Description"
                        marginTop={1}
                        height={15}
                        multiline={true}
                        placeholder="Enter event description"
                        handler={text => {
                            setDescription(text);
                        }}
                        value={description}
                    />

                    <DropDown
                        onSelected={e => {
                            setEventType(eventsTypes[e]);
                            setEventTypeError("");
                        }}
                        label="Event Type"
                        required
                        fullWidth
                        value={eventType}
                        options={eventsTypes}
                        errorMessage={eventTypeError}
                    />


                    <DatePickerField
                        label="Event Date"
                        required
                        placeholder={
                            eventDate ? (moment(eventDate).format("YYYY-MM-DD")).toString() : 'Select date of event...'
                        }
                        handler={() => {
                            setMode('date');
                            setShowDatePicker(true);

                        }
                        }
                        value={eventDate}
                        errorMessage={eventDateError}
                    />

                    <View style={styles.timeView}>
                        <Text style={styles.label}> Event Time </Text>
                        <Text style={styles.required}> * </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >


                        <DatePickerField
                            timePicker
                            required
                            placeholder={
                                eventStartTime ? (moment(eventStartTime).format("hh:mm A")).toString() : 'Start Time'
                            }
                            handler={() => {
                                setTimeType('start')
                                setMode('time');
                                setShowDatePicker(true)
                            }
                            }
                            value={eventStartTime}
                            errorMessage={eventStartTimeError}
                        />

                        <DatePickerField
                            required
                            timePicker
                            placeholder={
                                eventEndTime ? (moment(eventEndTime).format("hh:mm A")).toString() : 'End Time'
                            }
                            handler={() => {
                                setTimeType('end')
                                setMode('time');
                                setShowDatePicker(true)
                            }
                            }
                            value={eventEndTime}
                            errorMessage={eventEndTimeError}
                        />

                    </View>




                    {showDatePicker && (
                        <DateTimePicker
                            minimumDate={new Date()}
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onDateChange}
                        />
                    )}

                    <View style={styles.timeView}>
                        <Text style={styles.label}> Attach Document </Text>
                    </View>


                    {
                        eventDoc ?
                            <View style={styles.documentViewForm} >
                                <TouchableOpacity onPress={() => openFile(eventDoc.uri)} style={styles.documentView}>
                                    <FontAwesome
                                        name="file-pdf"
                                        color='#f40f02'
                                        size={responsiveFontSize(3.5)}
                                    />
                                    <Text
                                        numberOfLines={1}
                                        adjustsFontSizeToFit={true}
                                        style={styles.documentTitle} >
                                        {eventDoc.name}
                                    </Text>
                                    <TouchableOpacity onPress={() => { setEventDoc('') }} style={styles.removePdfView} >
                                        <Text style={styles.removeIcon} >
                                            X
                                        </Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </View> :
                            <Button
                                // backgroundColor="#118936"
                                btnText="Browse"
                                borderColor="#118936"
                                marginTop={2}
                                color="#118936"
                                height={6.5}
                                width={40}
                                handler={selectOneFile}
                            />
                    }
                    <Button
                        backgroundColor="#118936"
                        btnText="Create Event"
                        borderColor="#118936"
                        marginTop={2}
                        color="#ffffff"
                        height={6.5}
                        handler={submitHandler}
                    />






                </View>
            </ScrollView>
        </SafeAreaView>
    );
};