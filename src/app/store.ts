import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginAPI } from '../Features/login/loginAPI';
import { usersAPI } from '../Features/users/UsersAPI';
import authReducer from '../Features/auth/authSlice';

//auth persist config
const persistConfig = {
  key: 'auth',
  storage,
};

//combine all reducers
const rootReducer = combineReducers({
  [loginAPI.reducerPath]: loginAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  auth: authReducer, // Add the auth reducer here
});

//apply persistReducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginAPI.middleware).concat(usersAPI.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
