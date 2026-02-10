'use client'

import { Box, Typography, Container, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import PeopleIcon from '@mui/icons-material/People'
import SecurityIcon from '@mui/icons-material/Security'
import ChecklistIcon from '@mui/icons-material/Checklist'

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '120px 20px',
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('md')]: {
    padding: '80px 20px',
  },
}))

const WhiteBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 16,
  padding: '60px 40px',
  maxWidth: 1200,
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    padding: '40px 24px',
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: 60,
  color: '#000000',
  textAlign: 'center',
  lineHeight: 1.1,
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
    marginBottom: 40,
  },
}))

const HighlightText = styled('span')(({ theme }) => ({
  color: '#000000',
  fontWeight: 700,
}))

const ChallengeCard = styled(Box)<{ variant?: 'light' | 'dark' }>(
  ({ theme, variant = 'light' }) => ({
    padding: '32px 28px',
    borderRadius: 16,
    backgroundColor: variant === 'dark' ? '#000000' : '#f5f5f5',
    color: variant === 'dark' ? '#ffffff' : '#000000',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    minHeight: 140,
    [theme.breakpoints.down('sm')]: {
      padding: '24px 20px',
      minHeight: 'auto',
    },
  })
)

const IconWrapper = styled(Box)<{ variant?: 'light' | 'dark' }>(
  ({ theme, variant = 'light' }) => ({
    width: 48,
    height: 48,
    borderRadius: '50%',
    backgroundColor: variant === 'dark' ? '#ffffff' : '#000000',
    color: variant === 'dark' ? '#000000' : '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  })
)

const ChallengeText = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  lineHeight: 1.6,
  fontWeight: 400,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}))

export function OrganizationsTodaySection() {
  return (
    <SectionContainer>
      <Container maxWidth="xl">
        <WhiteBox>
          <Title>
            What do <HighlightText>Organizations</HighlightText> do today
          </Title>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ChallengeCard>
                <IconWrapper>
                  <PeopleIcon sx={{ fontSize: 24 }} />
                </IconWrapper>
                <ChallengeText>
                  Run multiple AI systems across teams and vendors
                </ChallengeText>
              </ChallengeCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ChallengeCard variant="dark">
                <IconWrapper variant="dark">
                  <SecurityIcon sx={{ fontSize: 24 }} />
                </IconWrapper>
                <ChallengeText>
                  Lack a unified view of compliance across frameworks (EU AI
                  Act, ISO 42001, OECD, NIST, Singapore)
                </ChallengeText>
              </ChallengeCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ChallengeCard>
                <IconWrapper>
                  <ChecklistIcon sx={{ fontSize: 24 }} />
                </IconWrapper>
                <ChallengeText>
                  Rely on static checklists, external audits or crisis-driven
                  fixes
                </ChallengeText>
              </ChallengeCard>
            </Grid>
          </Grid>
        </WhiteBox>
      </Container>
    </SectionContainer>
  )
}
