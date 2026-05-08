import { Card, CardContent, Typography, Box } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: SvgIconComponent;
    hint?: string;
}

const StatCard = ({ label, value, icon: Icon, hint }: StatCardProps) => {
    return (
        <Card
            elevation={0}
            sx={{
                width: "100%",
                minHeight: 165,
                border: "1px solid",
                borderColor: "#E5E7EB",
                borderRadius: "20px",
                backgroundColor: "#FFFFFF",
                transition: "all 0.2s ease",
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.04)",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0px 12px 24px rgba(15, 23, 42, 0.08)",
                },
            }}>
            <CardContent
                sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: "#6B7280",
                            fontWeight: 600,
                            fontSize: "14px",
                            letterSpacing: "-0.02em",
                        }}>
                        {label}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "30px",
                            fontWeight: 700,
                            color: "#020617",
                            lineHeight: 1,
                            letterSpacing: "-0.04em",
                        }}
                    >
                        {value}
                    </Typography>

                    {hint && (
                        <Typography
                            sx={{
                                fontSize: "14px",
                                color: "#64748B",
                                fontWeight: 500,
                            }}
                        >
                            {hint}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "16px",
                        backgroundColor: "#F3F4F6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon
                        sx={{
                            fontSize: 24,
                            color: "#0F172A",
                            strokeWidth: 1.8,
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default StatCard;
