import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateEvent from '../Screens/CreateEvent';
import EventsListings from '../Screens/EventsListings';

const Stack = createStackNavigator();

const EventStack = () => {
    return (
        <Stack.Navigator 
        initialRouteName={'EventsListings'}
        screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="EventsListings"
                component={EventsListings}
            />
            <Stack.Screen
                name="CreateEvent"
                component={CreateEvent}
            />

        </Stack.Navigator>
    );
};

export default EventStack;
