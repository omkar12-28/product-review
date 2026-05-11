import { useRef, useState } from "react";
import { Box, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import {
  UploadFile as UploadFileIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import type { Product } from "../lib/mock-data";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import axios from "axios";

interface ImportFileButtonProps {
  onImport: (products: Product[]) => void;
  hasImported: boolean;
  onReset: () => void;
}

function normalize(rows: Record<string, unknown>[]): Product[] {
  const pick = (
    row: Record<string, unknown>,
    keys: string[]
  ) => {
    for (const key of Object.keys(row)) {
      const normalizedKey = key
        .toLowerCase()
        .trim();

      if (
        keys.some(
          (target) => normalizedKey === target
        )
      ) {
        return row[key];
      }
    }

    return undefined;
  };

  return rows
    .map((row, index) => {
      // Product ID
      const id =
        Number(
          pick(row, [
            "product_id",
            "id",
          ])
        ) || index + 1;

      // Product Name
      const name = String(
        pick(row, [
          "product_name",
          "name",
          "product",
          "title",
        ]) ?? ""
      ).trim();

      // Category
      const rawCategory = String(
        pick(row, ["category", "type"]) ?? "Uncategorized"
      ).trim();

      const category = [...new Set(rawCategory.split("|"))].join(" | ");

      // Prices
      const discountedPrice = Number(
        pick(row, [
          "discounted_price",
          "price",
        ]) ?? 0
      );

      const actualPrice = Number(
        pick(row, [
          "actual_price",
          "original_price",
        ]) ?? discountedPrice
      );

      // Discount %
      const discount = Number(
        pick(row, [
          "discount_percentage",
          "discount",
        ]) ?? 0
      );

      // Rating
      const rating = Number(
        pick(row, [
          "rating",
          "stars",
          "score",
        ]) ?? 0
      );

      // Review Count
      const reviewCount = Number(
        pick(row, [
          "rating_count",
          "reviewcount",
          "reviews",
        ]) ?? 0
      );

      // Skip invalid rows
      if (!name) return null;

      return {
        id,

        name,

        category:
          category || "Uncategorized",

        // Use discounted price as display price
        price: Number.isFinite(discountedPrice)
          ? discountedPrice
          : 0,

        actualPrice: Number.isFinite(actualPrice)
          ? actualPrice
          : 0,

        discount: Number.isFinite(discount)
          ? discount
          : 0,

        rating: Number.isFinite(rating)
          ? Math.min(5, Math.max(0, rating))
          : 0,

        reviewCount: Number.isFinite(reviewCount)
          ? Math.max(
            0,
            Math.floor(reviewCount)
          )
          : 0,
      } as Product;
    })
    .filter(
      (p): p is Product => p !== null
    );
}

export function ImportFileButton({
  onImport,
  hasImported,
  onReset,
}: ImportFileButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info",
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const importProductsAPI = async (file: File) => {
    const API = "http://localhost:5000/api/products";
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${API}/import`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  };

  const handleFile = async (file: File) => {
    setLoading(true);

    try {
      const ext = file.name.split(".").pop()?.toLowerCase();

      if (!ext || !["csv", "xlsx", "xls"].includes(ext)) {
        showSnackbar("Only CSV or Excel files are allowed", "error");
        return;
      }

      const MAX_SIZE_MB = 5;

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        showSnackbar("File too large (max 5MB)", "error");
        return;
      }

      const response = await importProductsAPI(file);
      if (!response?.success && response?.message) {
        showSnackbar(response.message, "error");
        return;
      }

      const count = response?.count || 0;

      showSnackbar(
        `Successfully imported ${count} products from ${file.name}`,
        "success"
      );

      // optional: refresh UI after import
      onImport(response?.data || []);

    } catch (e) {
      showSnackbar(
        e instanceof Error ? e.message : "Import failed",
        "error"
      );
    } finally {
      setLoading(false);

      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flexWrap: "wrap",
        }}
      >
        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              handleFile(file);
            }
          }}
        />

        {/* Import Button */}
        <Button
          variant="outlined"
          size="small"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={16} thickness={5} />
            ) : (
              <UploadFileIcon fontSize="small" />
            )
          }
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            px: 1.8,
            py: 0.8,
            minWidth: 170,
          }}
        >
          {loading ? "Importing..." : "Import CSV / Excel"}
        </Button>

        {/* Reset Button */}
        {hasImported && (
          <Button
            variant="text"
            size="small"
            color="inherit"
            onClick={onReset}
            startIcon={<CloseIcon fontSize="small" />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              color: "text.secondary",
              fontWeight: 500,
              px: 1.5,
            }}
          >
            Reset to sample
          </Button>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
