import storage from "redux-persist/lib/storage";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import clockSlice from "./clockSlice.js";
import {persistReducer, persistStore} from "redux-persist";
import {encryptTransform} from "redux-persist-transform-encrypt";
// import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const persistConfig = {
    key: "root",
    storage,
    transforms: [
        encryptTransform({
            secretKey: "secret",
            onError: function (error) {
                // Handle the error.
            },
        }),
    ],
    whitelist: ["users"]
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    users: userSlice.reducer,
    clocks: clockSlice.reducer
}));

const store = configureStore({
    reducer: persistedReducer,
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //         },
    //     })

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store);
export default store;