import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import uiReducer from '@/store/slices/uiSlice';
import dashboardReducer from '@/store/slices/dashboardSlice';
import modelsReducer from '@/store/slices/modelsSlice';
import organizationsReducer from '@/store/slices/organizationsSlice';
import policiesReducer from '@/store/slices/policiesSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    dashboard: dashboardReducer,
    models: modelsReducer,
    organizations: organizationsReducer,
    policies: policiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

