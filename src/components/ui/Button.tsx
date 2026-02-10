'use client'

import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'

interface CustomButtonProps extends MUIButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
}

const StyledButton = styled(MUIButton)<{ customVariant?: string }>(({ theme, customVariant }) => ({
  textTransform: 'none',
  borderRadius: 8,
  padding: '12px 32px',
  fontWeight: 600,
  fontSize: '1rem',
  ...(customVariant === 'primary' && {
    backgroundColor: '#000000',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#333333',
    },
  }),
  ...(customVariant === 'secondary' && {
    backgroundColor: '#1976d2',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  }),
}))

export function Button({ variant = 'primary', ...props }: CustomButtonProps) {
  return <StyledButton customVariant={variant} {...props} />
}
