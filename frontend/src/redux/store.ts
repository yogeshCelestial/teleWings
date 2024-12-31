import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth/index';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;