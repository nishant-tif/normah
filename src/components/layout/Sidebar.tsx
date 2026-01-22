"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PolicyIcon from "@mui/icons-material/Policy";
import AppsIcon from "@mui/icons-material/Apps";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: "/assets/icons/Home.png" },
  {
    path: "/policy",
    label: "Policy",
    icon: "/assets/icons/Normal-Battery.png",
  },
  { path: "/model", label: "Models", icon: "/assets/icons/Document.png" },
  {
    path: "/organizations",
    label: "Organizations",
    icon: "/assets/icons/Supergroup.png",
  },
  {
    path: "/profile",
    label: "Profile",
    icon: "/assets/icons/User-Accepted.png",
  },
];

const Sidebar: React.FC<{
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}> = ({ mobileOpen, onMobileClose }) => {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      <Box
        sx={{
          p: 3,
          pb: 2,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="/assets/Normah-logo.png"
          alt="Normah"
          width={150}
          height={150}
        />
      </Box>

      <List
        sx={{
          flex: 1,
          px: 2,
          // pl: 4,
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.path || pathname?.startsWith(item.path + "/");

          return (
            <ListItem
              key={item.path}
              disablePadding
              sx={{
                mb: 0.5,
                width: "100%",
                "&:hover": { cursor: "pointer" },
                pl: isActive ? 0 : 1,
              }}
            >
              <ListItemButton
                component={Link}
                href={item.path}
                onClick={() => {
                  if (onMobileClose) {
                    onMobileClose();
                  }
                }}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? "#000000" : "transparent",
                  color: isActive ? "white" : "#333",
                  transform: isActive ? "scale(1.1)" : "scale(1)",

                  "&:hover": {
                    backgroundColor: isActive
                      ? "#000000"
                      : "rgba(255, 255, 255, 0.1)",
                    transform: "scale(1.1)",
                    transition: "transform 0.2s",
                  },
                  py: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 30,
                    minHeight: 30,
                    color: isActive ? "white" : "#333",
                    bgcolor: "white",
                    borderRadius: "10px",
                    p: 0.5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 1,
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.8rem",
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 1,
        }}
      >
        <Box
          component="span"
          sx={{
            width: 200,
            height: 200,
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "60px",
            color: "red",
          }}
        >
          <Image
            src="/assets/Mask-group.png"
            alt="normah-logo"
            width={200}
            height={200}
          />
        </Box>
      </Box>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: "#f5f5f5",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen || false}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            backgroundColor: "#2d2d2d",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
