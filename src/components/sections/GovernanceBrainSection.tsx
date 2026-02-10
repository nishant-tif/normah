'use client'

import { Box, Typography, Container, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import BoltIcon from '@mui/icons-material/Bolt'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '120px 20px',
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('md')]: {
    padding: '80px 20px',
  },
}))

const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: 80,
  color: '#000000',
  lineHeight: 1.1,
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
    marginBottom: 60,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}))

const HighlightText = styled('span')(({ theme }) => ({
  color: '#1976d2',
}))

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: '32px 24px',
  backgroundColor: '#f5f5f5',
  borderRadius: 16,
  marginBottom: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#eeeeee',
  },
}))

const FeatureContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  flex: 1,
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  backgroundColor: '#000000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  flexShrink: 0,
}))

const FeatureText = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#000000',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}))

const ArrowIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
  color: '#666666',
  fontSize: 20,
}))

const DashboardPreview = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 600,
  backgroundColor: '#2a2a2a',
  borderRadius: 16,
  padding: 24,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: 500,
  },
}))

const DashboardSidebar = styled(Box)(({ theme }) => ({
  width: 220,
  height: '100%',
  backgroundColor: '#1a1a1a',
  borderRadius: 12,
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}))

const SidebarItem = styled(Box)(({ theme }) => ({
  padding: '12px 16px',
  borderRadius: 8,
  color: '#ffffff',
  fontSize: '0.875rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  '&.active': {
    backgroundColor: '#1976d2',
  },
}))

const ModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: 24,
  marginTop: 20,
  border: '1px solid #e0e0e0',
}))

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: 20,
  color: '#000000',
}))

const InputField = styled(Box)(({ theme }) => ({
  height: 40,
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: 8,
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  marginBottom: 16,
  fontSize: '0.875rem',
  color: '#000000',
}))

export function GovernanceBrainSection() {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <MainTitle>
          <HighlightText>Normah</HighlightText> is like the governance brain
          for your AI systems
        </MainTitle>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FeatureCard>
              <FeatureContent>
                <IconWrapper>
                  <BoltIcon sx={{ fontSize: 24 }} />
                </IconWrapper>
                <FeatureText>Understands global AI rules and principles</FeatureText>
              </FeatureContent>
              <ArrowIcon />
            </FeatureCard>
            <FeatureCard>
              <FeatureContent>
                <IconWrapper>
                  <CheckCircleIcon sx={{ fontSize: 24 }} />
                </IconWrapper>
                <FeatureText>
                  Observes how your AI systems are being used
                </FeatureText>
              </FeatureContent>
              <ArrowIcon />
            </FeatureCard>
            <FeatureCard>
              <FeatureContent>
                <IconWrapper>
                  <MenuBookIcon sx={{ fontSize: 24 }} />
                </IconWrapper>
                <FeatureText>
                  Guides teams on what to fix, document, or improve
                </FeatureText>
              </FeatureContent>
              <ArrowIcon />
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardPreview>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  height: '100%',
                }}
              >
                <DashboardSidebar>
                  <Typography
                    sx={{ color: '#ffffff', fontWeight: 700, mb: 3, fontSize: '1rem' }}
                  >
                    NORMAH
                  </Typography>
                  <SidebarItem className="active">Dashboard</SidebarItem>
                  <SidebarItem>Policy</SidebarItem>
                  <SidebarItem>Model</SidebarItem>
                  <SidebarItem>Organizations</SidebarItem>
                  <SidebarItem>Profile</SidebarItem>
                </DashboardSidebar>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#666666', mb: 1 }}>
                      Pages / Policy
                    </Typography>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#000000' }}>
                      Policy
                    </Typography>
                  </Box>
                  <ModalBox>
                    <ModalTitle>Add New Policy</ModalTitle>
                    <InputField>Policy Name: Policy 3</InputField>
                    <InputField>Metric Name: Accuracy</InputField>
                    <InputField>Operator: &gt;&gt;</InputField>
                    <InputField>Severity: High</InputField>
                    <Box
                      sx={{
                        mt: 2,
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        padding: '12px 24px',
                        borderRadius: 8,
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Save
                    </Box>
                  </ModalBox>
                </Box>
              </Box>
            </DashboardPreview>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  )
}
