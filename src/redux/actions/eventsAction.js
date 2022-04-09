import { types } from "./actiontypes";

export const addNewEvent = (params) => ({
    type: types.ADD_NEW_EVENT,
    payload: params
});

export const updateEvent = (params) => ({
    type: types.UPDATE_EVENT,
    payload: params
});

export const deleteEvent = (params) => ({
    type: types.DELETE_EVENT,
    payload: params
});

export const getAllEvent = (params) => ({
    type: types.GET_ALL_EVENTS,
    payload: params
});
