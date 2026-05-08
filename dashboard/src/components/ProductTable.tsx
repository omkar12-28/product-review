import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Card,
  TableContainer,
  CircularProgress
} from "@mui/material";
import { Star } from "@mui/icons-material";
import type { Product } from "../lib/mock-data";

const ProductTable = ({ products }: { products: Product[] }) => {
  const PAGE_SIZE = 20;
  const [visible, setVisible] = useState(PAGE_SIZE);

  const rows = products.slice(0, visible);
  const loaderRef = useRef<HTMLDivElement>(null);
  const hasMore = visible < products.length;

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [products]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + PAGE_SIZE, products.length));
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [products.length]);

  return (
    <Card
      sx={{
        mt: 2,
        borderRadius: 0.5,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 6px 24px rgba(15, 23, 42, 0.06)",
      }}
    >
      <TableContainer sx={{
        maxHeight: 620, backgroundColor: "background.paper", scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
          width: 6,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(148, 163, 184, 0.4)",
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(148, 163, 184, 0.6)",
        },
      }}>
        <Table stickyHeader size="small">
          {/* HEADER */}
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "background.paper",
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "text.secondary",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  py: 1.5,
                },
              }}
            >
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Reviews</TableCell>
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary" variant="body2">
                    No products match your filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {rows.map((p) => (
              <TableRow
                key={p.id}
                hover
                sx={{
                  transition: "all 0.15s ease",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                  "& td": {
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    py: 1.6,
                  },
                }}
              >
                {/* Product */}
                <TableCell sx={{ fontWeight: 600 }}>
                  {p.name}
                </TableCell>

                {/* Category */}
                <TableCell>
                  <Chip
                    label={p.category}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      borderRadius: 1,
                      backgroundColor: "action.selected",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                </TableCell>

                {/* Price */}
                <TableCell
                  align="right"
                  sx={{
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 500,
                  }}
                >
                  ${p.price.toFixed(2)}
                </TableCell>

                {/* Discount */}
                <TableCell
                  align="right"
                  sx={{ fontVariantNumeric: "tabular-nums" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        p.discount > 0
                          ? "success.main"
                          : "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    {p.discount}%
                  </Typography>
                </TableCell>

                {/* Rating */}
                <TableCell align="right">
                  <Stack
                    sx={{
                      display: "flex",
                      gap: .5,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Star fontSize="small" sx={{ color: "#F59E0B" }} />
                    <Typography
                      variant="body2"
                      sx={{ fontVariantNumeric: "tabular-nums", fontWeight: 500 }}
                    >
                      {p.rating.toFixed(1)}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Reviews */}
                <TableCell
                  align="right"
                  sx={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {p.reviewCount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            {hasMore && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box
                    ref={loaderRef}
                    sx={{
                      py: 3,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Stack
                      sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}
                    >
                      <CircularProgress size={26} thickness={4} />

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                      >
                        Loading more data...
                      </Typography>
                    </Stack>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box
        sx={{
          px: 2,
          py: 1,
          borderTop: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="caption" sx={{ fontSize: 14, fontWeight: 500 }} color="text.secondary">
          Showing {rows.length} of {products.length} products
        </Typography>
      </Box>
    </Card>
  )
}

export default ProductTable;