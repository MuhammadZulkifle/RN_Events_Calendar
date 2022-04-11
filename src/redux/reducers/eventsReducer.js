import { types } from "../actions/actiontypes";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    events: [],
    error: '',
};

const eventsReducer = (state = initialState, action) => {
    const addEventsToStorage = async (eventsArray) => {
        try {
            await AsyncStorage.setItem('events', JSON.stringify(eventsArray));
        } catch (err) {
            console.log("Error Saving Event to storage");
        }
    }

    switch (action.type) {
        case types.ADD_NEW_EVENT:
            let array;
            if (state.events) {
                array = state.events.concat(action.payload);
            } else {
                array = [action.payload]
            }
            addEventsToStorage(array);
            return {
                ...state,
                events: array
            };

        case types.GET_ALL_EVENTS:
            return {
                ...state,
                events: action.payload
            };
        case types.UPDATE_EVENT:
            let updatedEvents = state.events.map((item) => {
                if (item.id == action.payload.id) {
                    return action.payload;
                } else {
                    return item
                }
            })
            return {
                ...state,
                events: updatedEvents
            };
        case types.DELETE_EVENT:
            let filtered = state.events.filter(item => item.id != action.payload);
            addEventsToStorage(filtered);
            return {
                ...state,
                events: filtered
            };
        default:
            return state;
    }
};

export default eventsReducer;
