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
import { deleteEvent } from '../../redux/actions/eventsAction'

import DeleteConfirmationModal from '../../Components/Shared/ConfirmationModal'

import styles from './styles';

export default EventsListing = (props) => {
    const [eventType, setEventType] = useState('All');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setselectedItem] = useState(-1);
    const [selectedEvents, setSelectedEvents] = useState([]);



    let currentDate = moment(new Date()).format("YYYY-MM-DD");

    const [markedDates, setMarkedDates] = useState({ [currentDate]: { selected: true, marked: true, selectedColor: '#118936' } });

    const dispatch = useDispatch();

    const eventsData = useSelector(
        state => state.eventsReducer.events
    );

    useEffect(() => {
        if(eventsData){
            let date = new Date();
            setSelectedEvents(eventsData?.filter(item => moment(date).isSame(item.eventDate, 'day')));
        }
    }, [eventsData]);

    const deletehandler = (item) => {
        setShowDeleteModal(true);
        setselectedItem(item)
    }

    const deleteConfirmHandler = () => {
        dispatch(deleteEvent(selectedItem.id))
        setShowDeleteModal(false);
    }

    const edithandler = (item) => {
        setShowEditModal(true);
        setselectedItem(item)
    }

    const editConfirmHandler = () => {
        setShowEditModal(false);
        props.navigation.navigate("CreateEvent", { item: selectedItem, screen: "Calendar" })
    }



    const EventsCards = ({ item, index }) => (
        <EventCard data={{
            eventTitle: item.eventName,
            description: item.description,
            eventDoc: item.eventDoc,
            docName: item.eventDoc.name,
            id: item.id,
            date: `${moment(item.eventDate).format("dddd , DD MMM  YYYY ").toString()} ${moment(item.eventStartTime).format("hh:mm A").toString()}`
        }}
            index={index}
            deleteHandler={() => deletehandler(item)}
            editHandler={() => edithandler(item)}
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
                    setSelectedEvents(eventsData?.filter(item => moment(day.dateString).isSame(moment(item.eventDate).format("YYYY-MM-DD")), 'day'));
                    const date = day.dateString;
                    setMarkedDates({
                        [day.dateString]: { selected: true, marked: true, selectedColor: '#118936' }
                    }
                    );
                }}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
            />
        )
    }

    const footerView = () => {
        return (

            selectedEvents?.length < 1 ?
                <View style={styles.noEventsView} >
                    <Text style={styles.noEventsText} >
                        No Events to show yet
                    </Text>
                </View>
                :
                <FlatList
                    contentContainerStyle={{ paddingBottom: responsiveHeight(20) }}
                    showsVerticalScrollIndicator={false}
                    data={selectedEvents}
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
                        handler={() => props.navigation.navigate('CreateEvent')}
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