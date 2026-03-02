import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { useAppSelector } from "@/store";

const AISystemRegistry = () => {
  const { data } = useAppSelector((state) => state.dashboard);
  return (
    <Box
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },
        minWidth: { xs: "100%", md: "400px" },
      }}
    >
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              AI System Registry
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#000",
                color: "white",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Add System
            </Button>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>System Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Risk Level</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Compliance</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data?.aiSystems ?? []).map((system) => (
                  <TableRow key={system.id}>
                    <TableCell>{system.systemName}</TableCell>
                    <TableCell>
                      <Chip
                        label={system.riskLevel}
                        size="small"
                        sx={{
                          backgroundColor: "#ffebee",
                          color: "#d32f2f",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>{system.compliance}%</TableCell>
                    <TableCell>{system.status}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: 3,
                          bgcolor: "#3BCBBE59",
                          border: "1px solid #2EB67D",
                        }}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AISystemRegistry;
