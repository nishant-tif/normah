'use client'

import { Card as MUICard, CardProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledCard = styled(MUICard)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
  },
}))

export function Card({ children, ...props }: CardProps) {
  return <StyledCard {...props}>{children}</StyledCard>
}
