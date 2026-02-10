'use client'

import { useState } from 'react'
import { Box, Typography, Container, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Link from 'next/link'

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '120px 20px',
  backgroundColor: '#ffffff',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: '80px 20px',
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 700,
  marginBottom: 60,
  color: '#000000',
  lineHeight: 1.1,
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
    marginBottom: 40,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}))

const HighlightText = styled('span')(({ theme }) => ({
  color: '#1976d2',
}))

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  marginBottom: 40,
}))

const CarouselWrapper = styled(Box)<{ translateX: number }>(({ theme, translateX }) => ({
  display: 'flex',
  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: `translateX(${translateX}%)`,
  willChange: 'transform',
}))

const ResourceCard = styled(Link)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 16,
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  flexShrink: 0,
  width: 'calc((100% - 64px) / 3)',
  marginRight: 32,
  display: 'block',
  [theme.breakpoints.down('md')]: {
    width: 'calc((100% - 24px) / 2)',
    marginRight: 24,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginRight: 0,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  '&:last-child': {
    marginRight: 0,
  },
}))

const DateBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  backgroundColor: '#000000',
  color: '#ffffff',
  padding: '6px 14px',
  borderRadius: 20,
  fontSize: '0.75rem',
  fontWeight: 600,
  zIndex: 1,
  letterSpacing: '0.5px',
}))

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 280,
  backgroundColor: '#e0e0e0',
  position: 'relative',
  overflow: 'hidden',
}))

const CardContent = styled(Box)(({ theme }) => ({
  padding: 24,
}))

const MetaInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 12,
  fontSize: '0.875rem',
  color: '#666666',
  marginBottom: 16,
  alignItems: 'center',
}))

const ResourceTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#000000',
  lineHeight: 1.3,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  },
}))

const ExternalLinkButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: '#000000',
  color: '#ffffff',
  width: 36,
  height: 36,
  zIndex: 2,
  '&:hover': {
    backgroundColor: '#333333',
  },
}))

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: '#ffffff',
  color: '#000000',
  width: 48,
  height: 48,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  zIndex: 10,
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '&.left': {
    left: -24,
    [theme.breakpoints.down('md')]: {
      left: -16,
    },
  },
  '&.right': {
    right: -24,
    [theme.breakpoints.down('md')]: {
      right: -16,
    },
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const PaginationDots = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 8,
  marginTop: 40,
}))

const Dot = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  width: active ? 32 : 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: active ? '#000000' : '#cccccc',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: active ? '#000000' : '#999999',
  },
}))

export function UsefulResourcesSection() {
  const resources = [
    {
      id: 1,
      date: 'JAN, 12 2026',
      readTime: '2 MIN READ',
      author: "AUTHOR'S NAME",
      title: 'What is Artificial Intelligence (AI)?',
      slug: 'what-is-artificial-intelligence-ai',
    },
    {
      id: 2,
      date: 'JAN, 07 2026',
      readTime: '3 MIN READ',
      author: "AUTHOR'S NAME",
      title: 'Your AI System',
      slug: 'your-ai-system',
    },
    {
      id: 3,
      date: 'JAN, 12 2026',
      readTime: '2 MIN READ',
      author: "AUTHOR'S NAME",
      title: 'What is Artificial Intelligence (AI)?',
      slug: 'what-is-artificial-intelligence-ai-2',
    },
    {
      id: 4,
      date: 'JAN, 15 2026',
      readTime: '4 MIN READ',
      author: "AUTHOR'S NAME",
      title: 'AI Governance Best Practices',
      slug: 'ai-governance-best-practices',
    },
    {
      id: 5,
      date: 'JAN, 18 2026',
      readTime: '3 MIN READ',
      author: "AUTHOR'S NAME",
      title: 'Understanding AI Compliance',
      slug: 'understanding-ai-compliance',
    },
    {
      id: 6,
      date: 'JAN, 20 2026',
      readTime: '5 MIN READ',
      author: "AUTHOR'S NAME",
      title: 'The Future of Responsible AI',
      slug: 'future-of-responsible-ai',
    },
  ]

  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(resources.length / itemsPerPage)

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleDotClick = (index: number) => {
    setCurrentPage(index)
  }

  // Calculate translateX: move by 100% per page (since each page shows 3 items = 100% of visible width)
  const translateX = -currentPage * 100

  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Title>
          Useful <HighlightText>Resources</HighlightText>
        </Title>

        <CarouselContainer>
          {totalPages > 1 && (
            <>
              <NavigationButton className="left" onClick={handlePrev}>
                <ChevronLeftIcon />
              </NavigationButton>
              <NavigationButton className="right" onClick={handleNext}>
                <ChevronRightIcon />
              </NavigationButton>
            </>
          )}
          
          <CarouselWrapper translateX={translateX}>
            {resources.map((resource) => (
              <ResourceCard
                href={`/article/${resource.slug}`}
                key={resource.id}
              >
                <Box sx={{ position: 'relative' }}>
                  <DateBadge>{resource.date}</DateBadge>
                  <ExternalLinkButton
                    size="small"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(`/article/${resource.slug}`, '_blank')
                    }}
                  >
                    <OpenInNewIcon fontSize="small" />
                  </ExternalLinkButton>
                  <ImageContainer />
                </Box>
                <CardContent>
                  <MetaInfo>
                    <Typography variant="body2">{resource.readTime}</Typography>
                    <Typography variant="body2">•</Typography>
                    <Typography variant="body2">{resource.author}</Typography>
                  </MetaInfo>
                  <ResourceTitle>{resource.title}</ResourceTitle>
                </CardContent>
              </ResourceCard>
            ))}
          </CarouselWrapper>
        </CarouselContainer>

        {totalPages > 1 && (
          <PaginationDots>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Dot
                key={index}
                active={index === currentPage}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </PaginationDots>
        )}
      </Container>
    </SectionContainer>
  )
}
