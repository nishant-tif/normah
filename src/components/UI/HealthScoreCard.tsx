import { Box, ListItemIcon } from "@mui/material";
import React from "react";
import Image from "next/image";
import { Card, CardContent, Typography, Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { summaryCards } from "../../config/SummaryCard";

const HealthScoreCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "flex-start",
        alignItems: "center",
        mb: 2,
        p: 3,
        borderRadius: 3,
        bgcolor: "#ffffff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          mr: 2,
          bgcolor: "#EBEBEB",
          py: 9,
          px: 10,
          borderRadius: 2,
        }}
      >
        <Image
          src={"/assets/Normah-logo.png"}
          alt="normah-logo"
          width={150}
          height={150}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            AI Governance Health Score
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{ borderRadius: 2, color: "white", fontWeight: 600 }}
          >
            Need Attention
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <Box
                key={card.key}
                sx={{
                  flex: {
                    xs: "1 1 100%",
                  },
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    bgcolor: "#F8F9FA",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 30,
                          minHeight: 30,
                          color: "#333",
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
                          src={card.icon}
                          alt={card.title}
                          width={15}
                          height={15}
                        />
                      </ListItemIcon>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", fontSize: 15 }}
                      >
                        {card.value} {card.title}
                        {/* {card.suffix} */}
                      </Typography>
                    </Box>

                    <Typography variant="caption" color="text.secondary">
                      {card.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default HealthScoreCard;
