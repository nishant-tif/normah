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
  Collapse,
  Drawer,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";

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
  const [openArticles, setOpenArticles] = useState(
    pathname?.startsWith("/articles"),
  );

  const handleArticlesToggle = () => {
    setOpenArticles(!openArticles);
  };

  const isArticleSubActive = (path: string) =>
    pathname === path || pathname?.startsWith(path);

  const sidebarContent = (
    <>
      {/* Logo */}
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
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
        }}
      >
        {/* Normal Menu Items */}
        {menuItems.map((item) => {
          const isActive =
            pathname === item.path || pathname?.startsWith(item.path + "/");

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={item.path}
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

        {/* ================= ARTICLES MENU ================= */}
        <ListItem disablePadding sx={{ mt: 2 }}>
          <ListItemButton
            onClick={handleArticlesToggle}
            sx={{
              borderRadius: 2,
              backgroundColor: pathname?.startsWith("/articles")
                ? "#000"
                : "transparent",
              color: pathname?.startsWith("/articles") ? "#fff" : "#333",
              transform: pathname?.startsWith("/articles")
                ? "scale(1.1)"
                : "scale(1)",
              marginBottom: pathname?.startsWith("/articles") ? 1 : 0,
              "&:hover": {
                backgroundColor: pathname?.startsWith("/articles")
                  ? "#000000"
                  : "rgba(255, 255, 255, 0.1)",
                transform: "scale(1.1)",
                transition: "transform 0.2s",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 30,
                minHeight: 30,
                color: pathname?.startsWith("/articles") ? "white" : "#333",
                bgcolor: pathname?.startsWith("/articles") ? "#000" : "white",
                borderRadius: "10px",
                p: 0.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 1,
              }}
            >
              <ArticleIcon
                sx={{
                  color: pathname?.startsWith("/articles") ? "#fff" : "#333",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Articles"
              primaryTypographyProps={{
                fontSize: "0.8rem",
                fontWeight: pathname?.startsWith("/articles") ? 600 : 400,
              }}
            />
            {openArticles ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>

        <Collapse in={openArticles} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {/* New Article */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/articles/new"
                sx={{
                  borderRadius: 2,
                  backgroundColor: isArticleSubActive("/articles/new")
                    ? "rgba(0,0,0,0.1)"
                    : "transparent",
                }}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="New Article" />
              </ListItemButton>
            </ListItem>

            {/* All Articles */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/articles"
                sx={{
                  borderRadius: 2,
                  backgroundColor:
                    pathname === "/articles"
                      ? "rgba(0,0,0,0.1)"
                      : "transparent",
                }}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <ArticleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="All Articles" />
              </ListItemButton>
            </ListItem>

            {/* Article Author */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/articles/authors"
                sx={{
                  borderRadius: 2,
                  backgroundColor: isArticleSubActive("/articles/authors")
                    ? "rgba(0,0,0,0.1)"
                    : "transparent",
                }}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Article Author" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <Box
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: "#f5f5f5",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          position: "fixed",
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen || false}
        onClose={onMobileClose}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
