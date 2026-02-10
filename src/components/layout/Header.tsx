'use client'

import { AppBar, Toolbar, Box, Typography, Button, Container } from '@mui/material'
import { useAppDispatch } from '@/store/hooks'
import { openWaitlist } from '@/store/slices/modalSlice'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import Image from 'next/image'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#000000',
  boxShadow: 'none',
  // borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
}))

const Logo = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  cursor: 'pointer',
  textDecoration: 'none',
}))

const LogoIcon = styled(Box)({
  width: 57,
  height: 55,
  position: "relative",
});

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 40,
  [theme.breakpoints.down('lg')]: {
    gap: 24,
  },
}))

const NavLink = styled(Link)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: 500,
  color: '#0000006c',
  cursor: 'pointer',
  transition: 'color 0.2s',
  textDecoration: 'none',
  '&:hover': {
    color: '#000000',
  },
}))

export function Header() {
  const dispatch = useAppDispatch()

  const handleJoinWaitlist = () => {
    dispatch(openWaitlist())
  }

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 2.5, minHeight: '72px !important' }}>
          <Logo href="/">
            <LogoIcon>
              <Image
                src="/images/logo/Normah-AI-Logo.png"
                alt="Normah AI Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </LogoIcon>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: '53px',
                letterSpacing: '0.5px',
                color: '#000000',
              }}
            >
              NORMAH
            </Typography>
          </Logo>
          <Box sx={{ flexGrow: 1 }} />
          <NavLinks sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLink href="/#products">Products</NavLink>
            <NavLink href="/#resources">Resources</NavLink>
            <NavLink href="/#solutions">Solutions</NavLink>
            <NavLink href="/#pricing">Pricing</NavLink>
          </NavLinks>
          {/* <Button
            variant="contained"
            onClick={handleJoinWaitlist}
            sx={{
              ml: 4,
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '10px 24px',
              borderRadius: 8,
              fontSize: '0.95rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1a1a1a',
              },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Join the Waitlist
          </Button> */}
        </Toolbar>
      </Container>
    </StyledAppBar>
  )
}
