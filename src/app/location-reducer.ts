import { Action } from '@ngrx/store';
export const initialState = 'Pune';
// export const SET_LOCATION = 'SET_LOCATION';
export const SET_ZIPCODE = 'SET_ZIPCODE';
// export const SET_LATITUDE = 'SET_LATITUDE';
// export const SET_LONGITUDE = 'SET_LONGITUDE';
export function locationReducer(state = initialState, action: any) {
    switch (action.type) {
        // case SET_LOCATION:
        //     state = action.payload
        //     return state;
        case SET_ZIPCODE:
            state = action.payload
            return state;
        // case SET_LATITUDE:
        //     state = action.payload
        //     return state;
        // case SET_LONGITUDE:
        //     state = action.payload
        //     return state;
        default:
            return state;
    }
}