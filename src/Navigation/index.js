import React, { useEffect } from "react";
import BottomTabNavigation from './BottomTabNavigation';
import { NavigationContainer } from "@react-navigation/native";

import { useDispatch, useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';



import { getAllEvent } from "../redux/actions/eventsAction";

export default Root = ()=>{

    const dispatch = useDispatch();
    useEffect( ()=>{
        getEvents();
    });

    const getEvents = async ()=>{
        let eventsData = await getEventsFromStorage();
        console.log("Events" , eventsData);
        dispatch(getAllEvent(JSON.parse(eventsData)));
    }
    
    const getEventsFromStorage = async ()=>{
        try{
           let events = await  AsyncStorage.getItem('events');
           console.log("Events from asyc Stotage" , events);
           return events;
        }catch(err){
            console.log("Error Getting Events" , err);
        }
    }


    
    return (
        <NavigationContainer>
          <BottomTabNavigation /> 
        </NavigationContainer>
      );
}


