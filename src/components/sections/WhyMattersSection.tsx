'use client'

import { Box, Typography, Container, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '120px 20px',
  backgroundColor: '#f8f9fa',
  [theme.breakpoints.down('md')]: {
    padding: '80px 20px',
  },
}))

const WhiteBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 24,
  padding: '60px 40px',
  maxWidth: 1200,
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    padding: '40px 24px',
    borderRadius: 16,
  },
}))

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 20,
}))

const IconBox = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#1976d2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  flexShrink: 0,
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 700,
  color: '#000000',
  marginBottom: 60,
  lineHeight: 1.1,
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
    marginBottom: 40,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}))

const ImageBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 350,
  backgroundColor: '#000000',
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: 24,
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(255, 107, 107, 0.4) 0%, rgba(78, 205, 196, 0.3) 50%, rgba(69, 183, 209, 0.4) 100%)',
    borderRadius: 16,
  },
}))

const PointCard = styled(Box)(({ theme }) => ({
  padding: 32,
  backgroundColor: '#ffffff',
  borderRadius: 12,
  marginBottom: 20,
  border: 'none',
  boxShadow: 'none',
}))

const PointText = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  lineHeight: 1.7,
  color: '#000000',
  fontWeight: 400,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}))

const ImageCaption = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 500,
  color: '#000000',
  marginTop: 16,
}))

export function WhyMattersSection() {
  return (
    <SectionContainer>
      <Container maxWidth="xl">
        <WhiteBox>
          <SectionHeader>
            <IconBox>
              <TrendingUpIcon sx={{ fontSize: 20 }} />
            </IconBox>
            <Typography
              variant="h6"
              sx={{ fontSize: '1rem', fontWeight: 500, color: '#1976d2' }}
            >
              Why This
            </Typography>
          </SectionHeader>
          <Title>Matters Now?</Title>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ImageBox />
              <ImageCaption>
                AI is entering its responsible scaling phase.
              </ImageCaption>
            </Grid>
            <Grid item xs={12} md={6}>
              <PointCard>
                <PointText>
                  With the EU AI Act, ISO 42001, and national frameworks coming
                  into force, trust and compliance will decide who can scale and
                  who can't.
                </PointText>
              </PointCard>
              <PointCard>
                <PointText>
                  Just like cybersecurity became a board-level function, AI
                  governance is becoming enterprise infrastructure.
                </PointText>
              </PointCard>
              <PointCard sx={{ marginBottom: 0 }}>
                <PointText>
                  <strong>Normah is built for this moment.</strong>
                </PointText>
              </PointCard>
            </Grid>
          </Grid>
        </WhiteBox>
      </Container>
    </SectionContainer>
  )
}
