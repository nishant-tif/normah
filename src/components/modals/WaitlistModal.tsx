'use client'

import { Box, Typography, TextField, MenuItem, Button } from '@mui/material'
import { Modal } from '@/components/ui/Modal'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeWaitlist } from '@/store/slices/modalSlice'
import { submitWaitlist } from '@/store/slices/waitlistSlice'
import { useForm, Controller } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import Image from 'next/image'




const ModalContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: 960,
  padding: 16,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}))

const LeftPanel = styled(Box)(({ theme }) => ({
  flex: '0 0 50%',
  padding: 48,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    flex: '0 0 auto',
    padding: 32,
  },


  backgroundImage: 'url("/images/pop-up/Rectangle111.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  opacity: 1,
  pointerEvents: 'none',
  borderRadius: 40,
}));


const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: 48,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    padding: 32,
  },
}))

const SmallText = styled(Typography)(({ theme }) => ({
  fontSize: '19px',
  fontWeight: 500,
  fontFamily: 'geist mono, monospace',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  color: '#ffffff',
  marginBottom: 16,
}))

const LargeText = styled(Typography)(({ theme }) => ({
  fontSize: '45px',
  fontWeight: 400,
  color: '#ffffff',
  fontFamily: 'SF Pro',
  maxWidth: 450,
  lineHeight: 1.3,
  marginBottom: 32,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
}))

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginTop: 'auto',
}))

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: '70px',
  fontWeight: 600,
  marginBottom: 32,
  fontFamily: 'SF Pro',
  color: '#000000',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}))

const HighlightText = styled('span')({
  background: 'linear-gradient(90deg, #016BFB 0%, #002E77 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});


const FormField = styled(Box)(({ theme }) => ({
  marginBottom: 0,
}))
const FieldLabel = styled(Typography)({
  fontSize: 20,
  fontWeight: 600,
  color: '#111',
  marginBottom: 4,
});

const CustomTextField = styled(TextField)({
  marginBottom: 28,

  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    backgroundColor: '#f3f3f3',

    '& fieldset': {
      borderColor: '#e0e0e0',
    },

    '&:hover fieldset': {
      borderColor: '#d0d0d0',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#2563eb',
      borderWidth: 2,
    },
  },

  '& .MuiOutlinedInput-input': {
    padding: '18px 20px',
    fontSize: '16px',
  },

  '& .MuiSelect-icon': {
    right: 12,
    color: '#888',
  },
});



const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: 12,
  color: '#fff',
  width: '220px',
  padding: '16px',
  fontSize: '20px',
  fontFamily: 'SF Pro',
  fontWeight: 600,
  borderRadius: 14,
  textTransform: 'none',
  background: 'linear-gradient(108.87deg, #006AFB 38.51%, #00133D 118.39%)',
  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',

  '&:hover': {
    background: 'linear-gradient(90deg, #3b82f6, #1e3a8a)',
    opacity: 0.95,
  },
}))

interface WaitlistFormData {
  name: string
  workEmail: string
  organisationName: string
  organisationType: string
  primaryReason: string
}

export function WaitlistModal() {
  const [orgOpen, setOrgOpen] = useState(false);
  const [reasonOpen, setReasonOpen] = useState(false);

  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.modal.isWaitlistOpen)
  const { loading, success } = useAppSelector((state) => state.waitlist)

  const { control, handleSubmit, reset, formState: { errors } } = useForm<WaitlistFormData>({
    defaultValues: {
      name: '',
      workEmail: '',
      organisationName: '',
      organisationType: '',
      primaryReason: '',
    },
  })

  useEffect(() => {
    if (success) {
      reset()
      dispatch(closeWaitlist())
    }
  }, [success, reset, dispatch])

  const onSubmit = async (data: WaitlistFormData) => {
    await dispatch(submitWaitlist(data))
  }

  const handleClose = () => {
    reset()
    dispatch(closeWaitlist())
  }

  return (
    <Modal open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <ModalContent>
        <LeftPanel>
          <Box>
            <SmallText>YOU CAN NOW</SmallText>
            <LargeText>Join early access to <strong>Normah&apos;s</strong> AI governance platform.</LargeText>
          </Box>
          <LogoBox>
            <Image
              src="/images/pop-up/Group632.png"
              alt="Normah Logo"
              width={256}
              height={51}
              priority
              style={{ height: 'auto' }}
            />
          </LogoBox>

        </LeftPanel>
        <RightPanel>
          <ModalTitle>
            Join the <HighlightText>Waitlist</HighlightText>
          </ModalTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <FieldLabel>Name</FieldLabel>

              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    placeholder="Your Full Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </FormField>
            <FormField>
              <FieldLabel>Work Email</FieldLabel>

              <Controller
                name="workEmail"
                control={control}
                rules={{
                  required: 'Work email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    placeholder="you@yourcompany.com"
                    type="email"
                    error={!!errors.workEmail}
                    helperText={errors.workEmail?.message}
                  />
                )}
              />
            </FormField>
            <FormField>
              <FieldLabel>Organisation Name</FieldLabel>
              <Controller
                name="organisationName"
                control={control}
                rules={{ required: 'Organisation name is required' }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    placeholder="Apple India Inc."
                    error={!!errors.organisationName}
                    helperText={errors.organisationName?.message}
                  />
                )}
              />
            </FormField>
            <FormField>
              <FieldLabel>Organisation Type</FieldLabel>
              <Controller
                name="organisationType"
                control={control}
                rules={{ required: 'Organisation type is required' }}
                render={({ field }) => (
                  <Box sx={{ position: 'relative' }}>
                    <CustomTextField
                      {...field}
                      fullWidth
                      select
                      SelectProps={{
                        onOpen: () => setOrgOpen(true),
                        onClose: () => setOrgOpen(false),
                        displayEmpty: true,
                        renderValue: (selected: string) => {
                          if (!selected) {
                            return (
                              <span style={{ color: '#9e9e9e' }}>
                                Select Organisation Type
                              </span>
                            );
                          }
                          return selected;
                        },
                      }}

                    >

                      <MenuItem disabled value="">
                        Select Organisation Type
                      </MenuItem>
                      <MenuItem value="Enterprise">Enterprise</MenuItem>
                      <MenuItem value="Startup">Startup</MenuItem>
                      <MenuItem value="Government">Government</MenuItem>
                      <MenuItem value="Non-profit">Non-profit</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </CustomTextField>

                    {/* Custom arrow */}
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 12,
                        top: '35%',
                        transform: 'translateY(-50%)',
                        width: 34,
                        height: 34,
                        backgroundColor: '#e5e5e5',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                      }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRight: '2px solid #666',
                          borderBottom: '2px solid #666',
                          transform: orgOpen
                            ? 'rotate(-135deg)'   // open ▲
                            : 'rotate(45deg)',    // closed ▼
                          transition: '0.25s ease',
                        }}
                      />
                    </Box>

                  </Box>


                )}
              />
            </FormField>
            <FormField>
              <FieldLabel>Primary Reason for Interest</FieldLabel>

              <Controller
                name="primaryReason"
                control={control}
                rules={{ required: 'Primary reason is required' }}
                render={({ field }) => (
                  <Box sx={{ position: 'relative' }}>

                    <CustomTextField
                      {...field}
                      fullWidth
                      select
                      error={!!errors.primaryReason}
                      helperText={errors.primaryReason?.message}
                      SelectProps={{
                        onOpen: () => setReasonOpen(true),
                        onClose: () => setReasonOpen(false),
                        displayEmpty: true,
                        renderValue: (selected: string) => {
                          if (!selected) {
                            return (
                              <span style={{ color: '#9e9e9e' }}>
                                Select Organisation Type
                              </span>
                            );
                          }
                          return selected;
                        },
                      }}

                    >
                      <MenuItem disabled value="">
                        Select Your Interest
                      </MenuItem>
                      <MenuItem value="Compliance">Compliance</MenuItem>
                      <MenuItem value="Risk Management">Risk Management</MenuItem>
                      <MenuItem value="Governance">Governance</MenuItem>
                      <MenuItem value="Research">Research</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </CustomTextField>

                    {/* Custom Arrow */}
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 12,
                        top: '35%',
                        transform: 'translateY(-50%)',
                        width: 34,
                        height: 34,
                        backgroundColor: '#e5e5e5',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                      }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRight: '2px solid #666',
                          borderBottom: '2px solid #666',
                          transform: reasonOpen
                            ? 'rotate(-135deg)'
                            : 'rotate(45deg)',
                          transition: '0.25s ease',
                        }}
                      />
                    </Box>

                  </Box>
                )}
              />
            </FormField>

            <SubmitButton
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Reserve Your Spot'}
            </SubmitButton>
          </form>
        </RightPanel>
      </ModalContent>
    </Modal >
  )
}
