import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
}

const initialState: NotificationState = {
  open: false,
  message: '',
  severity: 'info',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; severity?: 'success' | 'error' | 'warning' | 'info' }>
    ) => {
      state.open = true
      state.message = action.payload.message
      state.severity = action.payload.severity || 'info'
    },
    closeNotification: (state) => {
      state.open = false
    },
  },
})

export const { showNotification, closeNotification } = notificationSlice.actions
export default notificationSlice.reducer
