import { configureStore, combineReducers, EnhancedStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistedState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginAPI } from '../Features/login/loginAPI';
import { usersAPI} from '../Features/users/UsersAPI';
import { vehicleAPI} from '../Features/vehicles/vehicleAPI';
import { bookingAPI } from '../Features/bookings/bookingAPI';
import { transactionsAPI } from '../Features/Transactions/transactionsAPI';
import { fleetManagementAPI } from '../Features/Fleet/fleetManagementAPI';
import { supportTicketAPI } from '../Features/SupportTickets/SupportAPI';
import { branchesAPI } from '../Features/Branches/BranchesAPI';
import { stripeAPI } from '../Features/stripe/stripeAPI';

// auth persist config
const persistConfig = {
  key: 'auth',
  storage,
};

// combine all reducers
const rootReducer = combineReducers({
  [loginAPI.reducerPath]: loginAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [vehicleAPI.reducerPath]: vehicleAPI.reducer,
  [bookingAPI.reducerPath]: bookingAPI.reducer,
  [transactionsAPI.reducerPath]: transactionsAPI.reducer,
  [fleetManagementAPI.reducerPath]: fleetManagementAPI.reducer,
  [supportTicketAPI.reducerPath]: supportTicketAPI.reducer,
  [branchesAPI.reducerPath]: branchesAPI.reducer,
  [stripeAPI.reducerPath]: stripeAPI.reducer,
});

// apply persist reducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store
export const store: EnhancedStore<{
  loginAPI: ReturnType<typeof loginAPI.reducer>;
  usersAPI: ReturnType<typeof usersAPI.reducer>;
  vehicleAPI: ReturnType<typeof vehicleAPI.reducer>;
  bookingAPI: ReturnType<typeof bookingAPI.reducer>;
  transactionsAPI: ReturnType<typeof transactionsAPI.reducer>;
  fleetManagementAPI: ReturnType<typeof fleetManagementAPI.reducer>;
} & PersistedState> = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
    .concat(loginAPI.middleware)
    .concat(usersAPI.middleware)
    .concat(vehicleAPI.middleware)
    .concat(bookingAPI.middleware)
    .concat(transactionsAPI.middleware)
    .concat(fleetManagementAPI.middleware)
    .concat(supportTicketAPI.middleware)
    .concat(branchesAPI.middleware)
    .concat(stripeAPI.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
