"use client";

import React from "react";
import {
  Box,
  Breadcrumbs,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  showSearch?: boolean;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  breadcrumbs = [],
  showSearch = true,
  onMenuClick,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* Mobile Menu Button */}
          <IconButton
            onClick={onMenuClick}
            sx={{ display: { xs: "block", md: "none" }, color: "#2d2d2d" }}
          >
            <MenuIcon />
          </IconButton>

          {breadcrumbs.length > 0 && (
            <Breadcrumbs separator=" / " aria-label="breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <MuiLink
                  key={index}
                  href={crumb.href}
                  color={
                    index === breadcrumbs.length - 1
                      ? "text.primary"
                      : "inherit"
                  }
                  underline="none"
                  sx={{ fontSize: "0.875rem" }}
                >
                  {crumb.label}
                </MuiLink>
              ))}
            </Breadcrumbs>
          )}

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#2d2d2d",
              ml: breadcrumbs.length > 0 ? 2 : 0,
            }}
          >
            {title}
          </Typography>
        </Box>
        {showSearch && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              placeholder="Type"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 20, color: "#666" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: 120, sm: 150, md: 200 },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2d2d2d",
                color: "white",
                px: 3,
                "&:hover": {
                  backgroundColor: "#1a1a1a",
                },
              }}
            >
              Search
            </Button>
          </Box>
        )}
      </Box>

      {/* Header Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 5,
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#000",
              color: "#000",
              "&:hover": { borderColor: "#000", backgroundColor: "#f5f5f5" },
            }}
          >
            India AI Framework
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "white",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Export Report
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
