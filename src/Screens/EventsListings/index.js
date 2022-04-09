import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList
} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

import ButtonAddEvent from '../../Components/EventListingComponents/AddEventButton';
import EventCard from '../../Components/EventListingComponents/EventCard';

import DropDown from '../../Components/Shared/Dropdown';
import DeleteConfirmationModal from '../../Components/Shared/ConfirmationModal';

import styles from './styles'

let eventsTypes = [
    'All',
    'Event',
    'Out Of Office',
    'Task'
];

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
]



export default EventsListing = (props) => {
    const [eventType, setEventType] = useState('All');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [itemIndex, setItemIndex] = useState(-1);

    
    const eventsData = useSelector(
        state => state.eventsReducer.events
    );

    console.log("events data " , eventsData);

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
        <EventCard data={{
            eventTitle : item.eventName,
            description : item.description,
            eventDoc : item.eventDoc,
            docName : item.eventDoc.name,
            date : `${moment(item.eventDate).format("dddd , DD MMM  YYYY ").toString()} ${moment(item.eventStartTime).format("hh:mm A").toString()}`
        }}
            index={index}
            deleteHandler={() => deletehandler(index)}
            editHandler={() => edithandler(index)}
        />
        
    );
    return (
        <SafeAreaView style={styles.parentView}>
            <View style={styles.internalView}>
                <View style={styles.titleView} >
                    <Text style={styles.title}>My Events Listing</Text>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.headerView} >

                    <DropDown
                        onSelected={e => {
                            setEventType(eventsTypes[e]);
                        }}
                        value={eventType}
                        options={eventsTypes}
                    />

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



                <FlatList
                    contentContainerStyle={{ paddingBottom: responsiveHeight(20) }}
                    showsVerticalScrollIndicator={false}
                    data={eventsData}
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
            </View>
        </SafeAreaView>

    );
}