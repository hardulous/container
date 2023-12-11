import { configureStore } from "@reduxjs/toolkit";
import hostSlice from "./hostSlice";

const store = configureStore({
    reducer:{
        host: hostSlice.reducer
    }
})

export default store