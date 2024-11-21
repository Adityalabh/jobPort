// import  { configureStore } from "@reduxjs/toolkit";
// import userSlice from './userSlice.js';
// import jobSlice from "./jobSlice.js";

// const store = configureStore({
//     reducer:{
//         user:userSlice,
//         jobs:jobSlice,
//     }
// })

// export default store;
///////-------->>initial level setup of redux

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice.js';
import jobSlice from "./jobSlice.js";
import companySlice from "./compnaySlice.js";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 2,
    storage,
}

const rootReducer = combineReducers({
    user:userSlice,
    jobs:jobSlice,
    company:companySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store;