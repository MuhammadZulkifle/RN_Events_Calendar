import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList
} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PushNotification from "react-native-push-notification";

import ButtonAddEvent from '../../Components/EventListingComponents/AddEventButton';
import EventCard from '../../Components/EventListingComponents/EventCard';
import DropDown from '../../Components/Shared/Dropdown';
import DeleteConfirmationModal from '../../Components/Shared/ConfirmationModal';

import { deleteEvent } from '../../redux/actions/eventsAction'

import styles from './styles'

let eventsTypes = [
    'All',
    'Event',
    'Out Of Office',
    'Task'
];

export default EventsListing = (props) => {
    const [eventType, setEventType] = useState('All');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setselectedItem] = useState(-1);
    const [selectedData, setSelectedData] = useState([]);

    const dispatch = useDispatch();

    const eventsData = useSelector(
        state => state.eventsReducer.events
    );


    useEffect(() => {
        if(eventsData){
            const sorted = eventsData.sort((a, b) => {
                return new Date(a.eventDate) - new Date(b.eventDate);
            });
            setSelectedData(eventsData);
        }
    }, [eventsData]);

    const deletehandler = (item) => {
        setShowDeleteModal(true);
        setselectedItem(item)
        console.log("Index", item.id);
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
        props.navigation.navigate("CreateEvent", { item: selectedItem, screen: "Listing" })
    }



    const EventsCards = ({ item, index }) => (
        <EventCard data={{
            eventTitle: item.eventName,
            description: item.description,
            eventDoc: item.eventDoc,
            docName: item.eventDoc.name,
            id: item.id,
            date: `${moment(item.eventDate).format("dddd , DD MMM  YYYY").toString()} ${moment(item.eventStartTime).format("hh:mm A").toString()}`
        }}
            index={index}
            deleteHandler={() => deletehandler(item)}
            editHandler={() => edithandler(item)}
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
                            const sorted = eventsData?.sort((a, b) => {
                                return new Date(a.eventDate) - new Date(b.eventDate);
                            });
                            if (eventsTypes[e] == 'All') {
                                setSelectedData(sorted);
                                return;
                            }
                            setSelectedData(sorted?.filter(item => item.eventType == eventsTypes[e]))
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

                {
                    selectedData?.length < 1 ?

                        <View style={styles.noEventsView} >
                            <Text style={styles.noEventsText} >
                                No Events to show yet
                            </Text>
                        </View>
                        :
                        <FlatList
                            contentContainerStyle={{ paddingBottom: responsiveHeight(20) }}
                            showsVerticalScrollIndicator={false}
                            data={selectedData}
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
                }
            </View>
        </SafeAreaView>

    );
}