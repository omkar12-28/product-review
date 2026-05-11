import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import {
  BarChart,
} from "@mui/x-charts/BarChart";
import type { Product } from "../lib/mock-data";
import { useMemo } from "react";

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card elevation={2} sx={{ height: "100%" }}>
      <CardHeader
        title={
          <Typography variant="h6" fontSize={16} fontWeight={600}>
            {title}
          </Typography>
        }
      />
      <CardContent>
        <div style={{ width: "100%", height: 320 }}>{children}</div>
      </CardContent>
    </Card>
  );
}

export function ProductsPerCategoryChart({
  products,
}: {
  products: Product[];
}) {
  const data = useMemo(() => {
    const map = new Map<string, number>();

    products.forEach((p) => {
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    });

    return Array.from(map, ([category, count]) => ({
      category,
      count,
    })).sort((a, b) => b.count - a.count);
  }, [products]);

  return (
    <ChartCard title="Products per Category">
      <BarChart
        dataset={data}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "category",
          },
        ]}
        series={[
          {
            dataKey: "count",
            label: "Products",
          },
        ]}
        height={300}
      />
    </ChartCard>
  );
}

export function TopReviewedChart({
  products,
}: {
  products: Product[];
}) {
  const data = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, 8)
        .map((p) => ({
          name:
            p.name.length > 18
              ? `${p.name.slice(0, 18)}…`
              : p.name,
          reviews: p.reviewCount,
        })),
    [products]
  );

  return (
    <ChartCard title="Top Reviewed Products">
      <BarChart
        dataset={data}
        layout="horizontal"
        yAxis={[
          {
            scaleType: "band",
            dataKey: "name",
          },
        ]}
        series={[
          {
            dataKey: "reviews",
            label: "Reviews",
          },
        ]}
        height={320}
      />
    </ChartCard>
  );
}

export function DiscountHistogram({
  products,
}: {
  products: Product[];
}) {
const data = useMemo(() => {
    const buckets = [0, 10, 20, 30, 40, 50, 60, 70];

    const counts = buckets.map((b) => ({
      range: `${b}-${b + 10}%`,
      count: 0,
    }));

    products.forEach((p) => {
      const discount = Number(p.discount);

      // ✅ validation
      if (!Number.isFinite(discount) || discount < 0) return;

      const idx = Math.min(
        Math.floor(discount / 10),
        counts.length - 1
      );

      // ✅ extra protection
      if (counts[idx]) {
        counts[idx].count++;
      }
    });

    return counts;
  }, [products]);

  return (
    <ChartCard title="Discount Distribution">
      <BarChart
        dataset={data}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "range",
          },
        ]}
        series={[
          {
            dataKey: "count",
            label: "Products",
          },
        ]}
        height={300}
      />
    </ChartCard>
  );
}

export function CategoryAvgRatingChart({
  products,
}: {
  products: Product[];
}) {
  const data = useMemo(() => {
    const map = new Map<string, { sum: number; n: number }>();

    products.forEach((p) => {
      const cur = map.get(p.category) ?? {
        sum: 0,
        n: 0,
      };

      cur.sum += p.rating;
      cur.n++;

      map.set(p.category, cur);
    });

    return Array.from(map, ([category, { sum, n }]) => ({
      category,
      avg: Math.round((sum / n) * 100) / 100,
    })).sort((a, b) => b.avg - a.avg);
  }, [products]);

  return (
    <ChartCard title="Category-wise Average Rating">
      <BarChart
        dataset={data}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "category",
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: 5,
          },
        ]}
        series={[
          {
            dataKey: "avg",
            label: "Average Rating",
          },
        ]}
        height={300}
      />
    </ChartCard>
  );
}