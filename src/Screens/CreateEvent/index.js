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
import { useDispatch } from 'react-redux';
import PushNotification from "react-native-push-notification";


import styles from './styles';

import InputField from '../../Components/Shared/InputField';
import TextArea from '../../Components/Shared/TextArea';
import DatePickerField from '../../Components/Shared/DatePickerField';
import DropDown from '../../Components/Shared/Dropdown';
import Button from '../../Components/Shared/Button';

import { addNewEvent, updateEvent } from '../../redux/actions/eventsAction'


let eventsTypes = [
    'Event',
    'Out Of Office',
    'Task'
];
export default CreateEvent = (props) => {
    const [eventType, setEventType] = useState('Select');
    const [eventTypeError, setEventTypeError] = useState('');

    const [eventName, setEventName] = useState('');
    const [eventNameError, setEventNameError] = useState('');

    const [description, setDescription] = useState('');

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

    useEffect(() => {
        if (props?.route?.params) {
            let item = props.route.params.item;
            setEventName(item.eventName);
            setDescription(item.description);
            setEventType(item.eventType);
            setEventDate(new Date(item.eventDate));
            setEventStartTime(new Date(item.eventStartTime));
            setEventEndTime(new Date(item.eventEndTime));
            setEventDoc(item.eventDoc);
        }
    }, [props.route.params])

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        const currentDate = selectedDate || date;
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
            });

            if (res) {
                let uri = res[0].uri;

                if (Platform.OS === 'ios') {
                    uri = res.uri.replace('file://', '');
                }

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
                eventDate: new Date(`${(moment(eventDate).format("YYYY-MM-DD"))}T${(moment(eventStartTime).format("hh:mm:ss"))}`),
                eventStartTime,
                eventEndTime,
                eventDoc,
                id: props.route.params ? props.route.params.item.id : new Date().getUTCMilliseconds()
            }
            var d = new Date(event.eventDate);
            let subtractedvalue = moment((d.setMinutes(d.getMinutes() - 10)));
            let sliced = subtractedvalue.toISOString().slice(0, -5);
            let dateSelec = moment(sliced).format("ddd MMM DD YYYY HH:mm:ss") + " GMT+0500";
            PushNotification.localNotificationSchedule({
                channelId: "TestID",
                title: `Event ${event.eventName}`,
                message: "You have an event scheduled after 10 minutes",
                date: new Date(dateSelec),
                allowWhileIdle: true
            });
            if (props.route.params) {
                dispatch(updateEvent(event));
                props.route.params.screen == "Listing" ? props.navigation.navigate("EventsListings") :
                    props.navigation.navigate("EventsCalendarView");
                return;
            }
            dispatch(addNewEvent(event));
            props.navigation.getState().routes[0].name == "EventsListings" ? props.navigation.navigate('EventsListings') :
                props.navigation.navigate("EventsCalendarView");
        }

    }

    return (
        <SafeAreaView style={styles.parentView}>

            <ScrollView>

                <View style={styles.internalView}>

                    <View style={styles.titleView} >
                        <Text style={styles.title}>{props.route.params ? "Edit Event" : "Create Event"}</Text>
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
                        btnText={props.route.params ? "Edit Event" : "Create Event"}
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