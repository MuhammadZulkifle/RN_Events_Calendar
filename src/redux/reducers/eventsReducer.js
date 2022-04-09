import { types } from "../actions/actiontypes";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    loading: false,
    events: [],
    error: '',
};

const eventsReducer = (state = initialState, action) => {
    const addEventsToStorage = async () => {
        try {
            await AsyncStorage.setItem('events', JSON.stringify(initialState.events));
        } catch (err) {
            console.log("Error Saving Event to storage");
        }
    }

    switch (action.type) {
        case types.ADD_NEW_EVENT:
            console.log("INitial State ", state);
            let array = state.events.concat(action.payload);
            console.log("Array" , array);
            initialState.events.push(action.payload);
            console.log("Events", initialState.events);
            addEventsToStorage();
            return {
                ...state,
                events : array
            };

        case types.GET_ALL_EVENTS:
            console.log("EVENTS FROM ASYNC Storage Payload ", action.payload);
            return {
                ...state,
                events : action.payload
            };
        case types.UPDATE_EVENT:
            console.log(`DATE_EVEN REDUCER`);
            return {
                ...state,
            };
        case types.DELETE_EVENT:
            console.log(`DELETE_EVENT REDUCER`);

            return {
                ...state
            };

        default:
            return state;
    }
};

export default eventsReducer;
