import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { useAppSelector } from "@/store";

const ActiveAlerts = () => {
  const { data } = useAppSelector((state) => state.dashboard);
  return (
    <Box
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },
        minWidth: { xs: "100%", md: "400px" },
        borderRadius: 2,
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          //   minHeight: "24rem",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Active Alerts
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {(data?.activeAlerts ?? []).map((alert) => (
              <Box
                key={alert.id}
                sx={{
                  p: 2,
                  border: "1px solid #FD8A8A",
                  borderRadius: 2,
                  display: "flex",
                  gap: 1.5,
                  bgcolor: "#FFEBEB26",
                }}
              >
                <WarningIcon sx={{ color: "#f44336", mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {alert.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {alert.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActiveAlerts;
