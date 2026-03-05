import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"

import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

// Persist configuration
const persistConfig = {
  key: "user",
  storage,
  // persist the entire slice state; it only contains a `user` object now
  // whitelist controls which keys of the slice state are saved. the
  // previous setup listed fields that no longer exist, so nothing was stored.
  whitelist: ["user"],
}

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer)

// Configure store
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Create persistor
export const persistor = persistStore(store)