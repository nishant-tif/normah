'use client'

import { Box, Typography, Container, Grid, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Link from 'next/link'
import Image from 'next/image'

const FooterContainer = styled(Box)(({ theme }) => ({

  background: 'linear-gradient(107.61deg, #111111 73.41%, #101010 112.67%)',
  color: '#ffffff',
  padding: '80px 20px 40px',
  [theme.breakpoints.down('md')]: {
    padding: '60px 20px 30px',
  },
}))

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
}))

const LogoIcon = styled(Box)(({ theme }) => ({
  width: "100%",
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
}))


const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '56px',
  fontFamily: 'sf pro',
  color: '#ffffff',
}))

const LinkText = styled(Link)(({ theme }) => ({
  fontSize: '23px',
  color: '#ffffff7d',
  lineHeight: '62px',
  fontFamily: 'sf pro',
  cursor: 'pointer',
  transition: 'color 0.2s',
  display: 'block',
  textDecoration: 'none',
  '&:hover': {
    color: '#ffffff',
  },
}))

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontFamily: 'sf pro',
  fontWeight: 600,
  color: 'rgba(255, 255, 255, 0.5)',
  lineHeight: '30px',
  letterSpacing: '-0.4px',
  marginBottom: 100,
  maxWidth: 315,
  
}))

const SocialIcon = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#000000',
  width: 40,
  height: 40,
  marginRight: 8,
  marginBottom: 8,
  '&:hover': {
    backgroundColor: '#cccccc',
  },
}))

const BottomBar = styled(Box)(({ theme }) => ({
  marginTop: 60,
  padding: '40px',
  background: 'linear-gradient(91.1deg, rgba(255, 255, 255, 0.09) 28.53%, rgba(82, 82, 82, 0.09) 100%)',
  display: 'flex',
  borderRadius:"32px",
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 16,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}))

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 400,
  fontFamily: 'sf pro',
  color: '#ffffff',
}))

export function Footer() {
  return (
    <FooterContainer marginTop={-32}>
      <Container maxWidth="xl">
        <Grid container spacing={4} marginTop={20}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'  ,alignItems:'center'}}>
            <Description>
              <strong>Normah</strong> helps organizations
              build trustworthy AI at scale
              with governance as smart
              as their technology.
            </Description>
            <Logo>
              <LogoIcon>
                <Image
                  src="/images/logo/Group63.png"
                  alt="normah Logo"
                  width={315}
                  height={71}
                />
              </LogoIcon>

            </Logo>
          </Grid>
          <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'  ,alignItems:'end'}}>
            <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'  ,alignItems:'baseline'}}>
              <SectionTitle>Home</SectionTitle>
            <LinkText href="/#products">Products</LinkText>
            <LinkText href="/#resources">Resources</LinkText>
            <LinkText href="/#solutions">Solutions</LinkText>
            <LinkText href="/#pricing">Pricing</LinkText>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'  ,alignItems:'end'}}>
            <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'  ,alignItems:'baseline'}}>

            <SectionTitle>Company</SectionTitle>
            <LinkText href="/#about">About Us</LinkText>
            <LinkText href="/#how-we-work">How We Work</LinkText>
            <LinkText href="/#careers">Careers</LinkText>
            <LinkText href="/#blog">Blog</LinkText>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column'  ,alignItems:'center', width:'100%'}}>
            <Grid sx={{ display: 'flex', flexDirection: 'column'  ,alignItems:'end' ,width:'315px'}}>

            <SectionTitle sx={{marginBottom:8}}>Connect</SectionTitle>
            <LinkText href="mailto:hello@normah.ai" >
              hello@normah.ai
            </LinkText>
            <LinkText href="#" >
              New Delhi, India
            </LinkText>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' , justifyContent:'flex-end', marginTop: 2}}>
              <SocialIcon size="small">
                <FacebookIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon size="small">
                <InstagramIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon size="small">
                <TwitterIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon size="small">
                <LinkedInIcon fontSize="small" />
              </SocialIcon>
            </Box>
          </Grid>
          </Grid>
        </Grid>
        <BottomBar>
          <CopyrightText>© All Rights Reserved</CopyrightText>
          <CopyrightText>An Future Shift Labs Product</CopyrightText>
        </BottomBar>
      </Container>
    </FooterContainer>
  )
}
