import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clouds : undefined,
    main : {
        feels_like : undefined
    },
    name : undefined,
    sys : {
        country : undefined
    },
    weather : undefined,
    wind : undefined

}

export const weatherSlice = createSlice({
    name : 'weather',
    initialState,
    reducers : {
        setData : (state, action) => {
            console.log('setdata');
            //state.main.feels_like = action.payload.feels_like;
            const {clouds , main, name, sys, weather, wind} = action.payload;
            state.clouds = clouds;
            state.main = main;
            state.name = name;
            state.sys = sys;
            state.weather = weather;
            state.wind = wind;
        }
    }
})

export const {setData} = weatherSlice.actions;
export default weatherSlice.reducer;