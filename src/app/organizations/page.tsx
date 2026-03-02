"use client";

import React, { useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import Layout from "@/components/layout/Layout";
import { AddOrganizationModal } from "@/components/modals";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchOrganizations,
  setSelectedOrganization,
  deleteOrganization,
} from "@/store/slices/organizationsSlice";
import { openModal } from "@/store/slices/uiSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const OrganizationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { organizations, loading } = useAppSelector(
    (state) => state.organizations,
  );
  console.log("loading", loading);
  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  const handleAddNew = () => {
    dispatch(setSelectedOrganization(null));
    dispatch(openModal("addOrganization"));
  };

  const handleEdit = (organization: (typeof organizations)[0]) => {
    dispatch(setSelectedOrganization(organization));
    dispatch(openModal("addOrganization"));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this organization?")) {
      await dispatch(deleteOrganization(id));
    }
  };

  return (
    <Layout
      title="Organizations"
      breadcrumbs={[{ label: "Pages / Organizations" }]}
      showSearch={true}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box />
          <Button
            variant="contained"
            onClick={handleAddNew}
            sx={{
              backgroundColor: "#000000",
              color: "white",
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            Add New Organizations
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Organizations Name
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>State</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : organizations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No organizations found
                  </TableCell>
                </TableRow>
              ) : (
                organizations.map((organization) => (
                  <TableRow
                    key={organization?.organization_id}
                    hover
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "#fafafa",
                      },
                    }}
                  >
                    <TableCell>{organization.name}</TableCell>
                    <TableCell>{organization.organizationsName}</TableCell>
                    <TableCell>{organization.email}</TableCell>
                    <TableCell>{organization.address}</TableCell>
                    <TableCell>{organization.state}</TableCell>
                    <TableCell>{organization.city}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(organization)}
                          sx={{ color: "#666" }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleDelete(organization?.organization_id)
                          }
                          sx={{ color: "#666" }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <AddOrganizationModal />
      </Box>
    </Layout>
  );
};

export default OrganizationsPage;
