import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatRepo";

export const store=configureStore({
    reducer:{
        chat:chatReducer,
    },
})