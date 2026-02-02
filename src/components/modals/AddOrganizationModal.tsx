"use client";

import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/store";
import { closeModal } from "@/store/slices/uiSlice";
import {
  createOrganization,
  updateOrganization,
  setSelectedOrganization,
} from "@/store/slices/organizationsSlice";
import type { Organization } from "@/types";

const AddOrganizationModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeModal } = useAppSelector((state) => state.ui);
  const { selectedOrganization } = useAppSelector(
    (state) => state.organizations,
  );
  const isOpen = activeModal === "addOrganization";

  const [formData, setFormData] = useState<Omit<Organization, "id">>({
    name: "",
    organizationsName: "",
    email: "",
    address: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    if (selectedOrganization && isOpen) {
      setFormData({
        name: selectedOrganization.name,
        organizationsName: selectedOrganization.organizationsName,
        email: selectedOrganization.email,
        address: selectedOrganization.address,
        state: selectedOrganization.state,
        city: selectedOrganization.city,
      });
    } else {
      setFormData({
        name: "",
        organizationsName: "",
        email: "",
        address: "",
        state: "",
        city: "",
      });
    }
  }, [selectedOrganization, isOpen]);

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(setSelectedOrganization(null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedOrganization) {
        await dispatch(
          updateOrganization({
            id: selectedOrganization.organization_id,
            organization: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createOrganization(formData)).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error("Error saving organization:", error);
    }
  };

  const handleChange =
    (field: keyof typeof formData) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | { target: { value: unknown } },
    ) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const states = ["Chandigarh", "Delhi", "Mumbai", "Bangalore", "Punjab"];
  const cities = ["Chandigarh", "Delhi", "Mumbai", "Bangalore", "Ludhiana"];

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
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
          {selectedOrganization ? "Edit Organization" : "Add New Organization"}
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={handleChange("name")}
              fullWidth
              required
            />

            <TextField
              label="Organizations Name"
              value={formData.organizationsName}
              onChange={handleChange("organizationsName")}
              fullWidth
              required
            />

            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              fullWidth
              required
            />

            <TextField
              label="Address"
              value={formData.address}
              onChange={handleChange("address")}
              fullWidth
              required
              multiline
              rows={2}
            />

            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                label="State"
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                label="City"
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={handleClose} sx={{ color: "#666" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#000000",
              color: "white",
              "&:hover": {
                backgroundColor: "#333333",
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

export default AddOrganizationModal;
