'use client'

import { Box } from '@mui/material'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { WhyMattersSection } from '@/components/sections/WhyMattersSection'
import { GovernanceBrainSection } from '@/components/sections/GovernanceBrainSection'
import { CentralCommandSection } from '@/components/sections/CentralCommandSection'
import { OrganizationsTodaySection } from '@/components/sections/OrganizationsTodaySection'
import { UsefulResourcesSection } from '@/components/sections/UsefulResourcesSection'
import { FounderMessageSection } from '@/components/sections/FounderMessageSection'
import { Launching2026Section } from '@/components/sections/Launching2026Section'
import { WaitlistModal } from '@/components/modals/WaitlistModal'
import { PartnerModal } from '@/components/modals/PartnerModal'
import { Notification } from '@/components/ui/Notification'

export function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <Header />
      <Box sx={{ flex: 1 }}>
        <HeroSection />
        <WhyMattersSection />
        <GovernanceBrainSection />
        <CentralCommandSection />
        <OrganizationsTodaySection />
        <UsefulResourcesSection />
        <FounderMessageSection />
        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 6, md: 10 }, backgroundColor: '#ffffff' }}>
          <Launching2026Section />
        </Box>
      </Box>
      <Footer />
      <WaitlistModal />
      <PartnerModal />
      <Notification />
    </Box>
  )
}
