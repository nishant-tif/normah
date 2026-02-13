import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import uiReducer from "@/store/slices/uiSlice";
import dashboardReducer from "@/store/slices/dashboardSlice";
import modelsReducer from "@/store/slices/modelsSlice";
import organizationsReducer from "@/store/slices/organizationsSlice";
import policiesReducer from "@/store/slices/policiesSlice";
import articleReducer from "@/store/slices/articleSlice";
import countriesReducer from "@/store/slices/countriesSlice";
import statesReducer from "@/store/slices/stateSlice";
import citiesReducer from "@/store/slices/citySlice";
import categoriesReducer from "@/store/slices/categorySlice";
import authorsReducer from "@/store/slices/authorSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    dashboard: dashboardReducer,
    models: modelsReducer,
    organizations: organizationsReducer,
    policies: policiesReducer,
    articles: articleReducer,
    countries: countriesReducer,
    states: statesReducer,
    cities: citiesReducer,
    categories: categoriesReducer,
    authors: authorsReducer,
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
