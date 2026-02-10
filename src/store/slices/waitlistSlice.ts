import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '@/services/api'
import { showNotification } from './notificationSlice'

export interface WaitlistFormData {
  name: string
  workEmail: string
  organisationName: string
  organisationType: string
  primaryReason: string
}

interface WaitlistState {
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: WaitlistState = {
  loading: false,
  error: null,
  success: false,
}

export const submitWaitlist = createAsyncThunk(
  'waitlist/submit',
  async (data: WaitlistFormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/api/waitlist', data)
      dispatch(showNotification({ message: 'Successfully joined the waitlist!', severity: 'success' }))
      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to submit'
      dispatch(showNotification({ message, severity: 'error' }))
      return rejectWithValue(message)
    }
  }
)

const waitlistSlice = createSlice({
  name: 'waitlist',
  initialState,
  reducers: {
    resetWaitlist: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitWaitlist.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(submitWaitlist.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(submitWaitlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetWaitlist } = waitlistSlice.actions
export default waitlistSlice.reducer
