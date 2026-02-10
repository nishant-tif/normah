'use client'

import { Box, Typography, Container, IconButton, Breadcrumbs, Link } from '@mui/material'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import { Notification } from '@/components/ui/Notification'

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
}))

const ArticleContainer = styled(Container)(({ theme }) => ({
  padding: '120px 20px 80px',
  maxWidth: 900,
  [theme.breakpoints.down('md')]: {
    padding: '80px 20px 60px',
  },
}))

const BreadcrumbContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 40,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: 16,
    alignItems: 'flex-start',
  },
}))

const BreadcrumbLink = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#666666',
  textDecoration: 'none',
  '&:hover': {
    color: '#1976d2',
  },
}))

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  color: '#000000',
  width: 40,
  height: 40,
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  '&.next': {
    backgroundColor: '#1976d2',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  },
}))

const ArticleLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  letterSpacing: '4px',
  textTransform: 'uppercase',
  color: '#999999',
  marginBottom: 16,
  fontWeight: 500,
}))

const ArticleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 700,
  color: '#000000',
  marginBottom: 16,
  lineHeight: 1.1,
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}))

const ArticleMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  marginBottom: 40,
  fontSize: '0.875rem',
  color: '#666666',
}))

const ArticleImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 500,
  backgroundColor: '#f5f5f5',
  borderRadius: 16,
  marginBottom: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: 400,
  },
  [theme.breakpoints.down('sm')]: {
    height: 300,
  },
}))

const ArticleContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 40,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: 24,
  },
}))

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
  },
}))

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#666666',
  '&:hover': {
    color: '#1976d2',
    backgroundColor: 'transparent',
  },
}))

const ArticleText = styled(Box)(({ theme }) => ({
  flex: 1,
}))

const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  lineHeight: 1.8,
  color: '#000000',
  marginBottom: 24,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}))

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <PageContainer>
      <Header />
      <ArticleContainer>
        <BreadcrumbContainer>
          <Breadcrumbs separator="|" aria-label="breadcrumb">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbLink href="/article">Article</BreadcrumbLink>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <NavButton size="small">
              <ArrowBackIcon />
            </NavButton>
            <NavButton className="next" size="small">
              <ArrowForwardIcon />
            </NavButton>
          </Box>
        </BreadcrumbContainer>

        <ArticleLabel>ARTICLE</ArticleLabel>
        <ArticleTitle>The Impact Of Artificial Intelligence On Human Society</ArticleTitle>
        <ArticleMeta>
          <Typography>By Normah</Typography>
          <Typography>•</Typography>
          <Typography>09:30 AM | JAN, 12 2026</Typography>
        </ArticleMeta>

        <ArticleImage>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #ffe5b4 0%, #ffd89b 50%, #ffcc80 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Typography sx={{ fontSize: '3rem', color: '#666666', opacity: 0.3 }}>
              AI Illustration
            </Typography>
          </Box>
        </ArticleImage>

        <ArticleContent>
          <SocialIcons>
            <SocialIcon size="small">
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon size="small">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon size="small">
              <FacebookIcon />
            </SocialIcon>
          </SocialIcons>
          <ArticleText>
            <Paragraph>
              With the progressive development of AI, human labor will no longer
              be needed as everything can be done mechanically. Will humans
              become lazier and eventually degrade to the stage that we return to
              our primitive form of being? The process of evolution takes eons
              to develop, so we will not notice the backsliding of humankind.
              However how about if the AI becomes so powerful that it can
              program itself to be in charge and disobey the order given by its
              master, the humankind?
            </Paragraph>
            <Paragraph>
              <strong>Let Us See The Negative Impact The AI Will Have On Human Society</strong>
            </Paragraph>
            <Paragraph>
              1. A huge social change that disrupts the way we live in the human
              community will occur. Humankind has to be industrious to make their
              living, but with the service of AI, we can just program the machine
              to do a thing for us without even lifting a tool. Human closeness
              will be gradually diminishing as AI will replace the need for people
              to meet face to face for idea exchange. AI will stand in between
              people as the personal gathering will no longer be needed for
              communication.
            </Paragraph>
            <Paragraph>
              2. Unemployment is the next because many works will be replaced by
              machinery. Today, many automobile assembly lines have been filled
              with machineries and robots, forcing traditional workers to lose their
              jobs. Even in supermarket, the store clerks will not be needed
              anymore as the digital device can take over human labor.
            </Paragraph>
            <Paragraph>
              3. Wealth inequality will be created as the investors of AI will
              take up the major share of the earnings. The gap between the rich
              and the poor will be widened. The so-called "M" shape wealth
              distribution will be more obvious.
            </Paragraph>
            <Paragraph>
              4. New issues surface not only in a social sense but also in AI
              itself as the AI being trained and learned how to operate the given
              task can eventually take off to the stage that human has no control,
              thus creating un-anticipated problems and consequences. It refers to
              AI's capacity after being loaded with all needed algorithm may
              automatically function on its own course ignoring the command given
              by the human controller.
            </Paragraph>
            <Paragraph>
              5. The human masters who create AI may invent something that is
              racial bias or egocentrically oriented to harm certain people or
              things. For instance, the United Nations has voted to limit the
              spread of nucleus power in fear of its indiscriminative use to
              destroying humankind or targeting on certain races or region to
              achieve the goal of domination. AI is possible to target certain
              race or some programmed objects to accomplish the command of
              destruction by the programmers, thus creating world disaster.
            </Paragraph>
          </ArticleText>
        </ArticleContent>
      </ArticleContainer>
      <Footer />
      <Notification />
    </PageContainer>
  )
}
