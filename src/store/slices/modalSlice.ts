import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  isWaitlistOpen: boolean
  isPartnerOpen: boolean
}

const initialState: ModalState = {
  isWaitlistOpen: false,
  isPartnerOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openWaitlist: (state) => {
      state.isWaitlistOpen = true
    },
    closeWaitlist: (state) => {
      state.isWaitlistOpen = false
    },
    openPartner: (state) => {
      state.isPartnerOpen = true
    },
    closePartner: (state) => {
      state.isPartnerOpen = false
    },
  },
})

export const { openWaitlist, closeWaitlist, openPartner, closePartner } =
  modalSlice.actions
export default modalSlice.reducer
