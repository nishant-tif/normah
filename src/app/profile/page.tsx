"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { authService } from "@/services/dataService";

const ProfilePage: React.FC = () => {
  const navigation = useRouter();

  const handleLogOut = async () => {
    try {
      await authService.logout();
      navigation.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout
      title="Profile"
      breadcrumbs={[{ label: "Pages / Profile" }]}
      showSearch={false}
    >
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          px: { xs: 2, sm: 0 },
        }}
      >
        <Card>
          <CardContent
            sx={{
              p: { xs: 2.5, sm: 3, md: 4 },
            }}
          >
            {/* Avatar Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: { xs: 3, md: 4 },
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 70, sm: 85, md: 100 },
                  height: { xs: 70, sm: 85, md: 100 },
                  bgcolor: "#000",
                  fontSize: { xs: "1.8rem", sm: "2.1rem", md: "2.5rem" },
                  mb: 2,
                }}
              >
                U
              </Avatar>

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "18px", sm: "20px", md: "22px" },
                }}
              >
                User Profile
              </Typography>
            </Box>

            {/* Form */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                label="Name"
                defaultValue="John Doe"
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Email"
                type="email"
                defaultValue="john.doe@example.com"
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Role"
                defaultValue="Administrator"
                fullWidth
                variant="outlined"
                disabled
              />

              {/* Buttons */}
              <Box
                sx={{
                  pt: 2,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "stretch", sm: "center" },
                  gap: 2,
                }}
              >
                {/* Left Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#000",
                      color: "white",
                      width: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        backgroundColor: "#333",
                      },
                    }}
                  >
                    Save Changes
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>

                {/* Logout */}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFEEEE",
                    border: "1px solid #FF7495",
                    color: "#D32F2F",
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      backgroundColor: "#FFCCCC",
                    },
                  }}
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default ProfilePage;
