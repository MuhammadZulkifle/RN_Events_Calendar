import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList
} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

import ButtonAddEvent from '../../Components/EventListingComponents/AddEventButton';
import EventCard from '../../Components/EventListingComponents/EventCard';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import DeleteConfirmationModal from '../../Components/Shared/ConfirmationModal'

import styles from './styles';

let events = [
    {
        eventTitle: "Tour de Naran",
        date: "Monday , 22 March 2022 7:40 AM",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text.",
        docName: "Event Details.pdf"
    },
    {
        eventTitle: "Meeting CEO",
        date: "Tuesday , 23 March 2022 7:40 AM",
        docName: "Document Name.pdf"
    },
    {
        eventTitle: "Weekly Lunch",
        date: "Monday , 22 March 2022 7:40 AM",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text.",
    },
    {
        eventTitle: "Aftar Party",
        date: "Monday , 22 March 2022 7:40 AM",
    },
    {
        eventTitle: "Tour de Naran",
        date: "Monday , 22 March 2022 7:40 AM",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text.",
        docName: "Event Details.pdf"
    },
]


export default EventsListing = () => {
    const [eventType, setEventType] = useState('All');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [itemIndex, setItemIndex] = useState(-1);

    const eventsData = useSelector(
        state => state.eventsReducer.events
    );

    console.log("Events Data" ,(eventsData)) ;
    console.log("Type of " ,(eventsData));
    let currentDate = moment(new Date()).format("YYYY-MM-DD");
    console.log("Current Date", currentDate);


    const [markedDates, setMarkedDates] = useState({ [currentDate]: { selected: true, marked: true, selectedColor: '#118936' } });


    const deletehandler = (index) => {
        setShowDeleteModal(true);
        setItemIndex(index)
        console.log("Index", index);
    }

    const deleteConfirmHandler = () => {
        console.log("Deleting Item ", itemIndex);
        setShowDeleteModal(false);
    }

    const edithandler = (index) => {
        setShowEditModal(true);
        setItemIndex(index)
        console.log("Index", index);
    }

    const editConfirmHandler = () => {
        console.log("Editing Item ", itemIndex);
        setShowEditModal(false);
    }



    const EventsCards = ({ item, index }) => (
        <EventCard data={item}
            index={index}
            deleteHandler={() => deletehandler(index)}
            editHandler={() => edithandler(index)}
        />
    );

    const headerView = () => {
        return (
            <Calendar
                // Initially visible month. Default = now
                current={'2022-04-09'}
                markedDates={markedDates}

                hideArrows={false}
                theme={{
                    arrowColor: '#219F75'
                }}

                onDayPress={day => {
                    console.log('selected day', day);
                    console.log("Date", (new Date(day.timestamp)).toString());
                    console.log(day.dateString);
                    const date = day.dateString;
                    setMarkedDates({
                        [day.dateString]: { selected: true, marked: true, selectedColor: '#118936' }
                    }
                    );

                }}
                // firstDay={1}
                // hideExtraDays={true}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
            />
        )
    }

    const footerView = () => {
        return (
            <FlatList
                contentContainerStyle={{ paddingBottom: responsiveHeight(20) }}
                showsVerticalScrollIndicator={false}
                data={events}
                style={{
                    marginTop: responsiveHeight(1),
                }}
                keyExtractor={(item, index) => {
                    return index.toString();
                }}
                renderItem={
                    EventsCards
                }
            />

        )
    }

    return (
        <SafeAreaView style={styles.parentView}>
            <View style={styles.internalView}>
                <View style={styles.titleView} >
                    <Text style={styles.title}>My Events Calendar</Text>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.headerView} >

                    <ButtonAddEvent
                        marginTop={1}
                        backgroundColor="#118936"
                        height={5.8}
                        width={25}
                        btnText="Create Event"
                        borderColor="#118936"
                        color="white"
                        handler={() => props.submitHandler()}
                        iconName="plus"
                        iconColor="white"
                    />


                </View>

                <FlatList
                    contentContainerStyle={{ paddingBottom: responsiveHeight(20) }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={headerView}
                    ListFooterComponent={footerView} />



                {showDeleteModal && <DeleteConfirmationModal
                    modalShow={showDeleteModal}
                    toggleHandler={() => setShowDeleteModal(false)}
                    header="Delete Event?"
                    error="Are you sure you want to delete this event?"
                    yesHandler={deleteConfirmHandler}
                />}

                {showEditModal && <DeleteConfirmationModal
                    modalShow={showEditModal}
                    toggleHandler={() => setShowEditModal(false)}
                    header="Edit Event?"
                    error="Do you want to edit this event?"
                    yesHandler={editConfirmHandler}
                />}

            </View>
        </SafeAreaView>

    );
}