import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [
        {
            id: "adm-adebayo",
            fullname: "Raheem Adebayo",
            role: "admin",
            image: "src/assets/passport-1.jpg",
        }
    ],
    isAuthenticated: false,
    currentUser: undefined
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers :{
        addUser: (state, action) =>{
            state.users = [...state.users, action.payload]
        },
        updateUser: (state, action) =>{
            const userIndex = state.users.findIndex(u => u.id === action.payload.id);
            if (userIndex >= 0) {
                state.users[userIndex] = action.payload
            }
        },

        deleteUser: (state, action) =>{
            state.users = state.users.filter(u => u.id !== action.payload)
        },

        login: (state, action) => {
            state.isAuthenticated = true;
            state.currentUser = action.payload;
        },

        logout: (state) => {
            state.isAuthenticated = false;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice;