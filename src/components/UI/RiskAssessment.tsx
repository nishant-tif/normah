import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import riskAssessment from "@/config/Dashboard-risk.json";
import { useAppSelector } from "@/store";

const RiskAssessment = () => {
  const { data, loading } = useAppSelector((state) => state.dashboard);
  return (
    <Box
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 calc(100% - 12px)" },
        minWidth: { xs: "100%", md: "400px" },
      }}
    >
      <Box sx={{ bgcolor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Risk Assessment
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            {riskAssessment.riskAssessment.categories.map((item, index) => (
              <Card
                sx={{
                  width: "100%",
                  backgroundColor: `${item.color}`,
                  borderRadius: "10px",
                  border: `1px solid ${item.borderColor}`,
                }}
                key={index}
              >
                <CardContent sx={{ py: 1.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#333" }}
                      >
                        {item.level}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                    <Typography
                      color="#333"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    >
                      {data?.riskAssessment?.critical?.count}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Box>
    </Box>
  );
};

export default RiskAssessment;
