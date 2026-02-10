'use client'

import { Box, Typography, Container, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useAppDispatch } from '@/store/hooks'
import { openPartner } from '@/store/slices/modalSlice'
import Image from 'next/image'

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '60px 40px',
  background: 'linear-gradient(107.61deg, #0D62FD 73.41%, #083A97 112.67%)',
  borderRadius: 60,
  position: 'relative',
  overflow: 'hidden',
  maxWidth: 1300,
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    padding: '60px 24px',
    borderRadius: 16,
  },
}))

// const BackgroundPattern = styled(Box)(({ theme }) => ({
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   opacity: 0.1,
//   // backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//   pointerEvents: 'none',
// }))

const LogoIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 60,
  top: '50%',
  transform: 'translateY(-50%)',
  width: 207,
  height: 199,
  [theme.breakpoints.down('md')]: {
    width: 120,
    height: 120,
    right: 30,
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '71px',
  fontWeight: 700,
  color: '#ffffff',
  fontFamily: 'sf pro',
  position: 'relative',
  zIndex: 1,
  letterSpacing: '-1.2px',
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}))

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '23px',
  color: '#ffffff',
  fontFamily: 'sf pro',
  marginBottom: 40,
  position: 'relative',
  fontWeight: 300,
  zIndex: 1,
  maxWidth: 550,
  lineHeight: 1.6,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
  },
}))

const CTAButton = styled(Button)(({ theme }) => ({
  width: '50%',
  justifyContent: 'space-between',

  background: 'linear-gradient(90deg,#5B86E5,#6FA4FF)',
  color: '#fff',

  padding: '26px 28px',
  borderRadius: 30,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '28px',

  boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.15)',

  '&:hover': {
    background: 'linear-gradient(90deg,#5B86E5,#6FA4FF)',
    opacity: 0.95,
  },

  /* arrow container (white square) */
  '& .MuiButton-endIcon': {
    marginLeft: 20,
    background: '#fff',
    borderRadius: 14,
    padding: 10,
    display: 'flex',
  },

  /* arrow color */
  '& .MuiSvgIcon-root': {
    color: '#5B86E5',
    fontSize: 28,
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    padding: '20px 22px',
  },
}))


export function Launching2026Section() {
  const dispatch = useAppDispatch()

  const handlePartnerClick = () => {
    dispatch(openPartner())
  }

  return (
    <SectionContainer>
      {/* <BackgroundPattern /> */}
      <LogoIcon>
        <Image
          src="/images/logo/Mask-group.png"
          alt="Footer Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </LogoIcon>
      <Container maxWidth="lg">
        <Title>Launching in 2026</Title>
        <Description>
          We&apos;re <strong>inviting early partners and pilot organizations</strong> to <strong>co-create the
            future of AI governance.</strong>
        </Description>
        <CTAButton
          onClick={handlePartnerClick}
          endIcon={<ArrowForwardIcon />}
        >
          Partner With Us
        </CTAButton>

      </Container>
    </SectionContainer>
  )
}
