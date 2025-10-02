import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import interviewReducer from './features/interview/interviewSlice';
import candidatesReducer from './features/candidates/candidatesSlice';

const rootReducer = combineReducers({
  interview: interviewReducer,
  candidates: candidatesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['interview'], // Persist only the interview slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
