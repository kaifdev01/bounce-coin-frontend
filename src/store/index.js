import { configureStore } from "@reduxjs/toolkit";
import user from './UserSlice'; // Make sure the filename casing matches the actual file

const store = configureStore({
    reducer: { user }
});

export default store;
