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
import { getCookie } from "@/helper/getCookie";

const ProfilePage: React.FC = () => {
  const navigation = useRouter();
  //  const handleSubmit = async (event: React.FormEvent) => {
  //     event.preventDefault();
  //     try {
  //       const response = await authService.login({ user_email, user_password });
  //       console.log("response", response);
  //       if (typeof window !== "undefined") {
  //         localStorage.setItem("auth_token", response.token);
  //       }
  //       router.push("/dashboard");
  //     } catch (error) {
  //       alert("Login failed. Please check your credentials.");
  //     }
  //   };
  // const getCookies = async () => {
  //   const cookieStore = await getCookie();

  //   const accessToken = cookieStore.get("access_token")?.value;
  //   const refreshToken = cookieStore.get("refresh_token")?.value;

  //   console.log(accessToken, refreshToken);

  //   return Response.json({ accessToken, refreshToken });
  // };
  const handleLogOut = async () => {
    // navigation.push("/");

    try {
      console.log("Start");
      const cookies = await getCookie();
      console.log("cookies", cookies);
      const response = await authService.logout({ cookies });
      console.log("response", response);
      // if (typeof window !== "undefined") {
      //   localStorage.setItem("auth_token", response.token);
      // }

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
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#000",
                  fontSize: "2.5rem",
                  mb: 2,
                }}
              >
                U
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                User Profile
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
              <Box
                sx={{
                  // pt: 2,
                  display: "flex",
                  gap: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ pt: 2, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#000",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#333",
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button variant="outlined">Cancel</Button>
                </Box>
                <Box
                  sx={{
                    pt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFEEEE",
                      border: "1px solid #FF7495",
                      color: "#D32F2F",
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
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default ProfilePage;
