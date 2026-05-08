import type { Product } from "../lib/mock-data";
import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Cell,
} from "recharts";

const tooltipStyle = {
    backgroundColor: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--popover-foreground)",
    fontSize: 12,
};

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <Card
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                backgroundColor: "background.paper",
                overflow: "hidden",
                mt: 2
            }}
        >
            {/* Header */}
            <CardHeader
                title={
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        {title}
                    </Typography>
                }
                sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "& .MuiCardHeader-content": {
                        overflow: "hidden",
                    },
                }}
            />

            {/* Content */}
            <CardContent
                sx={{
                    p: 2,
                    "&:last-child": {
                        pb: 2,
                    },
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: 320,
                        position: "relative"
                    }}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        {children as any}
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    )
}

export function ProductsPerCategoryChart({ products }: { products: Product[] }) {
    return (
        <ChartCard title="Products per Category">
            <BarChart data={products} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
                <Bar dataKey="count" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ChartCard>
    );
};

export function TopReviewedChart({ products }: { products: Product[] }) {
    return (
        <ChartCard title="Top Reviewed Products">
            <BarChart data={products} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
                <Bar dataKey="reviews" fill="var(--chart-2)" radius={[0, 6, 6, 0]} />
            </BarChart>
        </ChartCard>
    );
};

export function DiscountHistogram({ products }: { products: Product[] }) {
    return (
        <ChartCard title="Discount Distribution">
            <BarChart data={products} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
                <Bar dataKey="count" fill="var(--chart-4)" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ChartCard>
    );
};

export function CategoryAvgRatingChart({ products }: { products: Product[] }) {
    const palette = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
    return (
        <ChartCard title="Category-wise Average Rating">
            <BarChart data={products} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
                <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
                    {products.map((_, i) => (
                        <Cell key={i} fill={palette[i % palette.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ChartCard>
    );
};