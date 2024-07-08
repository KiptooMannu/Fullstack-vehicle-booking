import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginAPI } from '../Features/login/loginAPI';
import { usersAPI } from '../Features/users/UsersAPI';
import { vehicleAPI } from '../Features/vehicles/vehicleAPI';
import { bookingAPI } from '../Features/bookings/bookingAPI';
import { transactionsAPI } from '../Features/Transactions/transactionsAPI';
import { fleetManagementAPI } from '../Features/Fleet/fleetManagementAPI';

//auth persist config
const persistConfig = {
  key: 'auth',
  storage,
}

//combine all reducers
const rootReducer = combineReducers({
  [loginAPI.reducerPath]: loginAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [vehicleAPI.reducerPath]: vehicleAPI.reducer,
  [bookingAPI.reducerPath]: bookingAPI.reducer,
  [transactionsAPI.reducerPath]: transactionsAPI.reducer,
  [fleetManagementAPI.reducerPath]: fleetManagementAPI.reducer,
});

//apply pesist Reducer to only counter reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginAPI.middleware).concat(usersAPI.middleware)
    .concat(vehicleAPI.middleware).concat(bookingAPI.middleware).concat(transactionsAPI.middleware)
    .concat(fleetManagementAPI.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
