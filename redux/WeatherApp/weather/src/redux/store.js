import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "weather",
    storage,
};

const persistedReducer = persistReducer(persistConfig, weatherReducer);

const store = configureStore({
    reducer: {
        weather: persistedReducer //doğrudan weatherReducer ile çalışmadı
    }
});

export const persistor = persistStore(store);
export default store;
