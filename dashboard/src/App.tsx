import { useState, useMemo } from "react";
import { Search, Inventory, ChatBubble, Star, LocalOffer } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Box, Container, Grid, Stack, Select, TextField, FormControl, InputAdornment, MenuItem, } from "@mui/material";
import { PRODUCTS, type Product } from "./lib/mock-data";
import ProductTable from "./components/ProductTable";
import StatCard from "./components/StatCard";
import { ImportFileButton } from "./components/ImportFileButton";

const RATING_BUCKETS = [
  { value: "all", label: "All ratings" },
  { value: "4.0", label: "4★ & up" },
  { value: "3.0", label: "3★ & up" },
  { value: "2.0", label: "2★ & up" },
  { value: "1.0", label: "1★ & up" },
];

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [rating, setRating] = useState("all");
  const [imported, setImported] = useState<Product[] | null>(null);
  const dataset = imported || PRODUCTS;
  const categoryOptions = useMemo(() => {
    return Array.from(
      new Set(
        dataset.flatMap((p) =>
          String(p.category)
            .split("|")
            .map((c) => c.trim())
        )
      )
    ).sort();
  }, [dataset]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const minRating = rating === "all" ? 0 : Number(rating);
    return dataset.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (category !== "all" && p.category !== category) return false;
      if (p.rating < minRating) return false;
      return true;
    });
  }, [query, category, rating, dataset]);

  const stats = useMemo(() => {
    const totalReviews = filtered.reduce((s, p) => s + p.reviewCount, 0);
    const avgRating = filtered.length
      ? filtered.reduce((s, p) => s + p.rating, 0) / filtered.length
      : 0;
    const avgDiscount = filtered.length
      ? filtered.reduce((s, p) => s + p.discount, 0) / filtered.length
      : 0;
    return {
      total: filtered.length,
      totalReviews,
      avgRating: avgRating.toFixed(2),
      avgDiscount: avgDiscount.toFixed(1) + "%",
    };
  }, [filtered]);

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        color="inherit"
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: "background.paper",
        }}
      >
        <Toolbar disableGutters>
          <Container maxWidth="xl" sx={{ px: 3, py: 3 }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, justifyContent: "space-between", gap: 3, }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}
                >
                  Product Ratings & Review Analytics
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Visual insights into product performance, customer feedback, and
                  engagement.
                </Typography>
              </Box>
              <ImportFileButton
                onImport={(p) => {
                  setImported(p);
                  setCategory("all");
                }}
                hasImported={imported !== null}
                onReset={() => {
                  setImported(null);
                  setCategory("all");
                }}
              />
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ px: 3, py: 3 }}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} sx={{ display: "flex" }}>
            <StatCard label="Products" value={stats.total} icon={Inventory} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }} sx={{ display: "flex" }}>
            <StatCard
              label="Total Reviews"
              value={stats.totalReviews.toLocaleString()}
              icon={ChatBubble}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }} sx={{ display: "flex" }}>
            <StatCard
              label="Avg Rating"
              value={stats.avgRating}
              icon={Star}
              hint="out of 5"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }} sx={{ display: "flex" }}>
            <StatCard
              label="Avg Discount"
              value={stats.avgDiscount}
              icon={LocalOffer}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 2,
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: .5,
            backgroundColor: "background.paper",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: {
                md: "center",
              },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Title */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Products
            </Typography>

            {/* Filters Group */}
            <Stack
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: 1.5,
                alignItems: "center",
              }}
            >
              {/* Search */}
              <TextField
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                size="small"
                sx={{
                  width: {
                    xs: "100%",
                    md: 380,
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    backgroundColor: "background.default",
                  },
                  "& input::placeholder": {
                    color: "text.secondary",
                    opacity: 0.7,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Category */}
              <FormControl
                size="small"
                sx={{
                  minWidth: 180,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    backgroundColor: "background.default",
                  },
                }}
              >
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="all">All categories</MenuItem>

                  {categoryOptions.map((c: string) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Rating */}
              <FormControl
                size="small"
                sx={{
                  minWidth: 160,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    backgroundColor: "background.default",
                  },
                }}
              >
                <Select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  displayEmpty
                >
                  {RATING_BUCKETS.map(
                    (r: { value: string; label: string }) => (
                      <MenuItem key={r.value} value={r.value}>
                        {r.label}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Box>
        <ProductTable products={filtered} />
      </Container>
    </>
  )
}

export default App
