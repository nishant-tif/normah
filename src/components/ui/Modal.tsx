'use client'

import { Dialog, DialogProps, IconButton, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 40,
    maxWidth: '90vw',
    margin: 16,
  },
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 16,
  top: 16,
  zIndex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
}))

interface CustomModalProps extends Omit<DialogProps, 'open'> {
  open: boolean
  onClose: () => void
  showCloseButton?: boolean
}

export function Modal({
  open,
  onClose,
  children,
  showCloseButton = true,
  ...props
}: CustomModalProps) {
  return (
    <StyledDialog open={open} onClose={onClose} {...props}>
      {showCloseButton && (
        <CloseButton onClick={onClose} size="small">
          <CloseIcon />
        </CloseButton>
      )}
      <Box>{children}</Box>
    </StyledDialog>
  )
}
