'use client'

import { Box, Typography, Container } from '@mui/material'
import { styled } from '@mui/material/styles'



const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '120px 20px',
  backgroundColor: '#ffffff',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: '80px 20px',
  },
}))



const BackgroundText = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '10rem',
  fontWeight: 700,
  color: 'rgba(25, 118, 210, 0.08)',
  whiteSpace: 'nowrap',
  zIndex: 0,
  lineHeight: 1.2,
  textAlign: 'center',
  [theme.breakpoints.down('lg')]: {
    fontSize: '6rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '4rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 700,
  marginBottom: 60,
  color: '#000000',
  position: 'relative',
  zIndex: 1,
  lineHeight: 1.1,
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
    marginBottom: 40,
  },
}))

const HighlightText = styled('span')(({ theme }) => ({
  color: '#1976d2',
  backgroundColor: '#e3f2fd',
  padding: '6px 16px',
  borderRadius: 8,
  display: 'inline-block',
  marginRight: 8,
}))

const ActionBox = styled(Box)(({ variant }) => ({
  padding: '18px 36px',
  borderRadius: 32,
  fontSize: 22,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  color: '#fff',

  background:
    variant === 'blue'
      ? 'linear-gradient(90deg, #3b82f6, #1e40af)'
      : '#000',
}));


const ActionsContainer = styled(Box)({
  marginTop: 80,
  display: 'flex',
  flexDirection: 'column',
  gap: 28,
});


type ActionRowProps = {
  offset?: number
}

const ActionRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'offset',
})<ActionRowProps>(({ offset = 0, theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  gap: 24,
  transform: `translateX(${offset}px)`,

  [theme.breakpoints.down('md')]: {
    transform: 'translateX(0)', // stack on mobile
  },
}));




const ColLeft = styled(Box)({
  gridColumn: 1,
});

const ColCenter = styled(Box)({
  gridColumn: 2,
  justifySelf: 'center',
});

const ColRight = styled(Box)({
  gridColumn: 3,
});






const GhostPill = styled(Box)({
  height: 64,
  borderRadius: 32,
  background: '#e9e9e9',
  opacity: 0.7,
});



export function CentralCommandSection() {

  return (
    <SectionContainer>
      {/* <BackgroundText>
        AI moved fast.
        <br />
        Governance didn't.
      </BackgroundText> */}
      <Container maxWidth="lg">
        {/* <Title>
          <HighlightText>Normah</HighlightText> acts as a central command
          center that
        </Title> */}

       <ActionsContainer>

  {/* Row 1 — center */}
  <ActionRow offset={0}>
    <ColLeft><GhostPill /></ColLeft>
    <ColCenter>
      <ActionBox variant="black">
        Monitors AI systems continuously
      </ActionBox>
    </ColCenter>
    <ColRight><GhostPill /></ColRight>
  </ActionRow>

  {/* Row 2 — move right */}
  <ActionRow offset={120}>
    <ColLeft><GhostPill /></ColLeft>
    <ColCenter><GhostPill /></ColCenter>
    <ColRight>
      <ActionBox variant="blue">
        Flags risks like bias, privacy gaps, and missing oversight
      </ActionBox>
    </ColRight>
  </ActionRow>

  {/* Row 3 — move left */}
  <ActionRow offset={-120}>
    <ColLeft>
      <ActionBox variant="black">
        Maps issues directly to global laws and standards
      </ActionBox>
    </ColLeft>
    <ColCenter><GhostPill /></ColCenter>
    <ColRight><GhostPill /></ColRight>
  </ActionRow>

  {/* Row 4 — move right more */}
  <ActionRow offset={180}>
    <ColLeft><GhostPill /></ColLeft>
    <ColCenter><GhostPill /></ColCenter>
    <ColRight>
      <ActionBox variant="blue">
        Tells organizations exactly what to fix
      </ActionBox>
    </ColRight>
  </ActionRow>

</ActionsContainer>




      </Container>
    </SectionContainer>
  )
}
