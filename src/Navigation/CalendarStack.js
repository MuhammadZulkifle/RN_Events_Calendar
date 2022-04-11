import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateEvent from '../Screens/CreateEvent';
import EventsCalendarView from '../Screens/EventsCalendarView';

const Stack = createStackNavigator();

const EventCalendarStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'EventsCalendarView'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="EventsCalendarView"
                component={EventsCalendarView}
            />
            <Stack.Screen
                name="CreateEvent"
                component={CreateEvent}
            />

        </Stack.Navigator>
    );
};

export default EventCalendarStack;
