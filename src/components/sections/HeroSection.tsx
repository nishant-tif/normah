'use client'

import { Box, Typography, Container, Button, keyframes } from '@mui/material'
import { useAppDispatch } from '@/store/hooks'
import { openWaitlist } from '@/store/slices/modalSlice'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { text } from 'stream/consumers'

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  padding: '0px 0px 0px', // remove bottom padding
  position: 'relative',
  overflow: 'hidden',

  backgroundImage: `url("/images/home-page/colour32.png")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',

  [theme.breakpoints.down('md')]: {
    padding: '80px 0px 0px',
    minHeight: '80vh',
  },
}));





const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '26px',
  fontWeight: 500,
  fontStyle: 'medium',
  letterSpacing: '18px',
  textTransform: 'uppercase',
  color: '#000000',
  marginBottom: 20,
  fontFamily: 'SF Pro',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    letterSpacing: '2px',
  },
}))

const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: '82px',
  fontWeight: 700,
  lineHeight: 1.2,
  marginBottom: 40,
  color: '#000000',
  maxWidth: 1000,
  margin: '0 auto 40px',
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}))

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundImage: 'linear-gradient(108.87deg, #2D2D2D 38.51%, #0E0E0E 118.39%)',
  color: '#ffffff',
  padding: '10px 28px',
  fontSize: '24px',
  fontWeight: 600,
  borderRadius: 8,
  textTransform: 'none',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  '&:hover': {
    backgroundColor: '#1a1a1a',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
}))


const scroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;
const BarWrapper = styled(Box)({
  width: "100%",
  overflow: "hidden",
  background: "#000",
  padding: "10px 0",
  whiteSpace: "nowrap",
});
const Marquee = styled(Box)({
  display: "inline-flex",
  gap: "40px",
  animation: `${scroll} 25s linear infinite`,
});
const Text = styled(Typography)({
  color: "#fff",
  fontSize: "22px",
  letterSpacing: "-0.53px",
  fontWeight: 300,
  fontFamily: 'Geist Mono, monospace',
  textTransform: "uppercase",
});

export function HeroSection() {
  const SlidingText =
    "Policy informed compliance intelligence • Normah AI operationalises responsible AI governance with automated, policy informed compliance intelligence";


    
  const dispatch = useAppDispatch()

  const handleJoinWaitlist = () => {
    dispatch(openWaitlist())

    
  }

  return (
    <HeroContainer >

      {/* Bottom Illustration */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/images/home-page/SL-072622-51930-18.png"
          alt="Hero Illustration"
          width={1440}
          height={823}
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </Box>

      {/* Hero Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, mt: 4 }}>
        <Subtitle>MEET NORMAH</Subtitle>
        <MainTitle>Responsible AI Governance Infrastructure</MainTitle>
        <CTAButton onClick={handleJoinWaitlist}>
          Join the Waitlist
        </CTAButton>
      </Container>

      {/* BOTTOM IMAGE */}
      <Box sx={{ width: '100%' , position: 'relative', zIndex: 2, mb: -6, mt: 5, }}>
        <Image
          src="/images/home-page/HeaderScreenshot.png"
          alt="Header Screenshot"
          width={1109}
          height={571}
          priority
        />
      </Box>
      <BarWrapper sx={{ width: '100%' , position: 'relative', zIndex: 3, }}> 
      {/* duplicate content for infinite loop */}
      <Marquee>
        <Text>{SlidingText}</Text>
        <Text>{SlidingText}</Text>
        <Text>{SlidingText}</Text>
        <Text>{SlidingText}</Text>
      </Marquee>
    </BarWrapper>


    </HeroContainer>

  )
}
