'use client'

import { Snackbar, Alert, AlertColor } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeNotification } from '@/store/slices/notificationSlice'

export function Notification() {
  const dispatch = useAppDispatch()
  const { open, message, severity } = useAppSelector((state) => state.notification)

  const handleClose = () => {
    dispatch(closeNotification())
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity as AlertColor} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
