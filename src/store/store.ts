import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modalSlice'
import waitlistReducer from './slices/waitlistSlice'
import partnerReducer from './slices/partnerSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    waitlist: waitlistReducer,
    partner: partnerReducer,
    notification: notificationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
