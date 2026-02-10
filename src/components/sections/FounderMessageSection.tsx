'use client'

import { Box, Typography, Container, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Image from 'next/image'

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '120px 20px',
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('md')]: {
    padding: '80px 20px',
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '100px',
  fontWeight: 700,
  fontFamily: 'sf pro',
  textAlign: 'center',
  color: '#000000',
  lineHeight: '112px',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
    marginBottom: 40,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}))

const HighlightText = styled('span')(({ theme }) => ({
  background: 'linear-gradient(90deg, #0D62FD 73.08%, #0042B9 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
}))


const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 60,
  [theme.breakpoints.down('md')]: {
    gap: 40,
  },
}))

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: '0 0 320px',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 auto',
    maxWidth: 320,
    margin: '0 auto',
  },
}))

const FounderImage = styled(Box)(({ theme }) => ({
  width: '580px',
  maxHeight: 600,

  aspectRatio: '1',
  position: 'relative',
  overflow: 'hidden',
}))

const LinkedInButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#000000',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#333333',
  },
}))

const TextContainer = styled(Box)(({ theme }) => ({
  flex: 1,
}))

const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  lineHeight: '49px',
  fontFamily: 'sf pro',
  letterSpacing: '-0.5px',
  color: '#000000',
  marginBottom: 40,
  fontWeight: 400,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}))

const Signature = styled(Box)(({ theme }) => ({
  marginTop: 40,
}))

const SignatureName = styled(Typography)(({ theme }) => ({
  fontFamily: 'cursive, serif',
  fontSize: '71px',
  color: '#000000',
  marginBottom: 8,
  fontWeight: 400,
}))

const SignatureTitle = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  color: '#000000',
  fontWeight: 400,
}))

export function FounderMessageSection() {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Title>
          Message from <br></br><HighlightText>the Founder</HighlightText>
        </Title>

        <ContentContainer>
          <ImageContainer>
            <FounderImage>
              <Image
                src="/images/Group73.png"
                alt="Founder"
                fill
                style={{ objectFit: "cover" }}
              />
              <LinkedInButton>
                <LinkedInIcon fontSize="small" />
                @vidhisharma
              </LinkedInButton>
            </FounderImage>
          </ImageContainer>
          <TextContainer>
            <Paragraph>
              Innovation is rarely straightforward. It&apos;s messy, unpredictable,
              and often marked by setbacks. Yet what keeps us moving forward is
              purpose - a belief that technology, when guided by the right
              principles, can serve people better.
            </Paragraph>
            <Paragraph>
              When I began working in AI policy, one thing became clear:{' '}
              <strong>governance was lagging behind innovation</strong>. Around
              the world, organizations were adopting AI faster than they were
              understanding its risks or responsibilities. From Europe&apos;s
              sweeping AI Act to India&apos;s emerging frameworks, the pace of
              regulation has quickened, but the implementation gap remains wide.
            </Paragraph>
            <Paragraph>
              That&apos;s where <strong>Normah</strong> was born - from a simple
              question: How do we make responsible AI real, not just
              aspirational?
            </Paragraph>
            <Paragraph>
              Normah isn&apos;t just another compliance tool. It&apos;s an effort to{' '}
              <strong>
                translate complex policy into practical governance
              </strong>
              . To help organizations see their AI systems clearly: what&apos;s
              compliant, what&apos;s risky, and what needs attention. Our platform
              reflects a belief that responsibility doesn&apos;t slow innovation, it
              strengthens it.
            </Paragraph>
            <Paragraph>
              The four dots in our logo represent what we stand for:{' '}
              <strong>
                Clarity, Integrity, Adaptability, and Collaboration
              </strong>
              . Together, they form the core of how we see the future: connected,
              balanced, and guided by trust.
            </Paragraph>
            <Paragraph>
              As we build Normah, our goal is simple: to help businesses innovate
              confidently, regulators act decisively, and society trust AI more
              deeply. Because responsible innovation isn&apos;t just a checkbox,
              it&apos;s the foundation of lasting progress.
            </Paragraph>
            <Paragraph>Thank you for being part of this journey.</Paragraph>
            <Paragraph>We&apos;re just getting started!</Paragraph>
            <Signature>
              <Typography sx={{ mb: 2, fontSize: '36px', color: '#000000' }}>
                Sincerely,
              </Typography>
              <SignatureName>Vidhi Sharma</SignatureName>
              <SignatureTitle>Founder, Normah</SignatureTitle>
            </Signature>
          </TextContainer>
        </ContentContainer>
      </Container>
    </SectionContainer>
  )
}
