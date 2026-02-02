import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useAppSelector } from "@/store";

/**
 * Circular ring using conic-gradient
 */
const CircularRing = ({ value }: { value: number }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: 140,
        height: 140,
        borderRadius: "50%",
        background: `conic-gradient(
          #000 ${value * 3.6}deg,
          #e6e6e6 ${value * 3.6}deg
        )`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Inner cutout */}
      <Box
        sx={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 36,
            fontWeight: 600,
            color: "#2f2f46",
          }}
        >
          {value}%
        </Typography>
      </Box>
    </Box>
  );
};

const ProgressRow = ({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: number;
  danger?: boolean;
}) => (
  <Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        mb: 1,
        flexDirection: "column",
      }}
    >
      {/* Square icon */}
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 2,
            backgroundColor: "#5cc5b8",
            mr: 1.5,
          }}
        />
        <Typography sx={{ flexGrow: 1, fontSize: 14 }}>{label}</Typography>
      </Box>
      <Typography sx={{ fontWeight: 600 }}>{value}%</Typography>
    </Box>

    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 4,
        borderRadius: 2,
        backgroundColor: "#e5e9f0",
        "& .MuiLinearProgress-bar": {
          backgroundColor: danger ? "#c94b4b" : "#5cc5b8",
        },
      }}
    />
  </Box>
);

const ComplianceStatus = () => {
  const { data } = useAppSelector((state) => state.dashboard);

  return (
    <Box
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },
        minWidth: { xs: "100%", md: 400 },
      }}
    >
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
            Compliance Status
          </Typography>

          {/* Gray panel */}
          <Box
            sx={{
              backgroundColor: "#f3f3f3",
              borderRadius: 3,
              py: 4,
              mb: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularRing value={data?.compliance?.overall} />
          </Box>

          {/* Bottom rows */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              justifyContent: "space-between",
            }}
          >
            <ProgressRow label="EU AI Act" value={data?.compliance?.euAiAct} />
            <ProgressRow label="ISO 42001" value={data?.compliance?.iso42001} />
            <ProgressRow
              label="India DPDP Act"
              value={data?.compliance?.indiaDpdpAct}
              danger
            />
            <ProgressRow
              label="OECD Principles"
              value={data?.compliance?.oecdPrinciples}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ComplianceStatus;
