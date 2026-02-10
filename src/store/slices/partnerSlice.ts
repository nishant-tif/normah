import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api'
import { showNotification } from './notificationSlice'

export interface PartnerFormData {
  name: string
  workEmail: string
  organisationName: string
  organisationType: string
  collaborationType: string
}

interface PartnerState {
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: PartnerState = {
  loading: false,
  error: null,
  success: false,
}

export const submitPartner = createAsyncThunk(
  'partner/submit',
  async (data: PartnerFormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/api/partner', data)
      dispatch(showNotification({ message: 'Successfully submitted partnership request!', severity: 'success' }))
      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to submit'
      dispatch(showNotification({ message, severity: 'error' }))
      return rejectWithValue(message)
    }
  }
)

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    resetPartner: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPartner.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(submitPartner.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(submitPartner.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetPartner } = partnerSlice.actions
export default partnerSlice.reducer
