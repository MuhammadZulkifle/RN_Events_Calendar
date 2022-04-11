import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import EventStack from './EventStackNavigation';
import EventCalendarStack from './CalendarStack';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#118936',
                tabBarHideOnKeyboard: true,
                headerShown : false
            }}>
            <Tab.Screen
                name="Events Listings"
                component={EventStack}
                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <MaterialIcons
                                name="emoji-events"
                                color={focused ? '#118936' : '#D4D4D4'}
                                size={responsiveFontSize(3.5)}
                            />
                        )
                    }}
            />
            <Tab.Screen
                name="Events Calendar View"
                component={EventCalendarStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name="calendar"
                            color={focused ? '#118936' : '#D4D4D4'}
                            size={responsiveFontSize(3.5)}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
