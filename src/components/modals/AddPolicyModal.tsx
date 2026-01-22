'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/store';
import { closeModal } from '@/store/slices/uiSlice';
import { createPolicy, updatePolicy, setSelectedPolicy } from '@/store/slices/policiesSlice';
import type { Policy } from '@/types';

const AddPolicyModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeModal } = useAppSelector((state) => state.ui);
  const { selectedPolicy } = useAppSelector((state) => state.policies);
  const isOpen = activeModal === 'addPolicy';

  const [formData, setFormData] = useState<Omit<Policy, 'id'>>({
    policyName: '',
    metricName: 'Accuracy',
    operator: '>=',
    expectedValue: '',
    severity: 'High',
    description: '',
  });

  useEffect(() => {
    if (selectedPolicy && isOpen) {
      setFormData({
        policyName: selectedPolicy.policyName,
        metricName: selectedPolicy.metricName,
        operator: selectedPolicy.operator,
        expectedValue: selectedPolicy.expectedValue,
        severity: selectedPolicy.severity,
        description: selectedPolicy.description,
      });
    } else {
      setFormData({
        policyName: '',
        metricName: 'Accuracy',
        operator: '>=',
        expectedValue: '',
        severity: 'High',
        description: '',
      });
    }
  }, [selectedPolicy, isOpen]);

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(setSelectedPolicy(null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedPolicy) {
        await dispatch(updatePolicy({ id: selectedPolicy.id, policy: formData })).unwrap();
      } else {
        await dispatch(createPolicy(formData)).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error('Error saving policy:', error);
    }
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: unknown } }
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ fontWeight: 600, fontSize: '1.25rem' }}>
          {selectedPolicy ? 'Edit Policy' : 'Add New Policy'}
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Policy Name"
              value={formData.policyName}
              onChange={handleChange('policyName')}
              fullWidth
              required
            />

            <FormControl fullWidth>
              <InputLabel>Metric Name</InputLabel>
              <Select
                value={formData.metricName}
                onChange={(e) => setFormData({ ...formData, metricName: e.target.value })}
                label="Metric Name"
              >
                <MenuItem value="Accuracy">Accuracy</MenuItem>
                <MenuItem value="Bias Flag">Bias Flag</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Operator</InputLabel>
              <Select
                value={formData.operator}
                onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                label="Operator"
              >
                <MenuItem value=">=">{'>='}</MenuItem>
                <MenuItem value="<=">{'<='}</MenuItem>
                <MenuItem value="=">=</MenuItem>
                <MenuItem value="!=">{'!='}</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Expected Value"
              value={formData.expectedValue}
              onChange={handleChange('expectedValue')}
              fullWidth
              required
            />

            <TextField
              label="Severity"
              value={formData.severity}
              onChange={handleChange('severity')}
              fullWidth
              required
            />

            <TextField
              label="Description"
              value={formData.description}
              onChange={handleChange('description')}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={handleClose} sx={{ color: '#666' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#000000',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333333',
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPolicyModal;
