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
  Chip,
  IconButton,
} from "@mui/material";
import Layout from "@/components/layout/Layout";
import { AddPolicyModal } from "@/components/modals";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchPolicies,
  setSelectedPolicy,
  deletePolicy,
} from "@/store/slices/policiesSlice";
import { openModal } from "@/store/slices/uiSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PolicyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { policies, loading } = useAppSelector((state) => state.policies);
  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const handleAddNew = () => {
    dispatch(setSelectedPolicy(null));
    dispatch(openModal("addPolicy"));
  };

  const handleEdit = (policy: (typeof policies)[0]) => {
    dispatch(setSelectedPolicy(policy));
    dispatch(openModal("addPolicy"));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this policy?")) {
      await dispatch(deletePolicy(id));
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Layout
      title="Policy"
      breadcrumbs={[{ label: "Pages / Policy" }]}
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
            Add New Policy
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 600 }}>Policy Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Metric Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Operator</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Expected Value</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Severity</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
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
              ) : policies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No policies found
                  </TableCell>
                </TableRow>
              ) : (
                policies.map((policy) => (
                  <TableRow
                    key={policy.policy_id}
                    hover
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "#fafafa",
                      },
                    }}
                  >
                    <TableCell>{policy.policyName}</TableCell>
                    <TableCell>{policy.metricName}</TableCell>
                    <TableCell>{policy.operator}</TableCell>
                    <TableCell>{policy.expectedValue}</TableCell>
                    <TableCell>
                      <Chip
                        label={policy.severity}
                        color={
                          getSeverityColor(policy.severity) as
                            | "error"
                            | "warning"
                            | "success"
                            | "default"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{policy.description}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(policy)}
                          sx={{ color: "#666" }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(policy.policy_id)}
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

        <AddPolicyModal />
      </Box>
    </Layout>
  );
};

export default PolicyPage;
