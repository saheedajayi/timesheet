import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clocks: [

    ]

}

const clockSlice = createSlice({
    name: "clocks",
    initialState,
    reducers: {
        clockIn: ( state, action)=>{
            const userClock = {
                id: action.payload,
                status: "in",
                time: new Date(),
            }
            state.clocks = [...state.clocks, userClock]
        },

        clockOut: (state, action) =>{
            const userClock = {
                id: action.payload,
                status: "out",
                time: new Date(),
            }
            state.clocks = [...state.clocks, userClock]
        },
    }
})

export const clockActions = clockSlice.actions;
export default clockSlice;
