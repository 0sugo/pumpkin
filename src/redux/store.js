import { configureStore } from "@reduxjs/toolkit";
import productsSliceReducer from "./Products/productsSlice";

const store = configureStore({
    reducer:{
        allProducts:productsSliceReducer,

    }
});

export default store;