import { Request, Response } from "express";
import prisma from "../lib/prisma";
import fs from "fs";
import csv from "csv-parser";
import xlsx from "xlsx";

// GET /api/products
export const getAllProducts = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 30;
    try {
    const products = await prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
        id: "desc",
      },
    });

    if (products.length === 0) {
      return res.json({
        success: true,
        message: "No products found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const importProducts = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const filePath = req.file.path;
    const ext = req.file.originalname.split(".").pop();

    let products: any[] = [];

    // ================= CSV FILE =================
    if (ext === "csv") {
      const results: any[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          products = results;

          await insertProducts(products);

          fs.unlinkSync(filePath);

          return res.json({
            message: "CSV imported successfully",
            count: products.length,
          });
        });

      return;
    }

    // ================= EXCEL FILE =================
    if (ext === "xlsx") {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      products = sheetData;

      await insertProducts(products);

      fs.unlinkSync(filePath);

      return res.json({
        message: "Excel imported successfully",
        count: products.length,
      });
    }

    return res.status(400).json({ message: "Invalid file format" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Import failed" });
  }
};

const insertProducts = async (products: any[]) => {
  const formatted = products.map((p) => ({
    productId: String(p.product_id),

    name: p.product_name,
    category: p.category,

    discountedPrice: Number(p.discounted_price) || 0,
    actualPrice: p.actual_price ? Number(p.actual_price) : null,

    discountPercent: Number(p.discount_percentage) || 0,

    rating: Number(p.rating) || 0,
    ratingCount: Number(p.rating_count) || 0,

    aboutProduct: p.about_product || null,

    userName: p.user_name || null,
    reviewTitle: p.review_title || null,
    reviewContent: p.review_content || null,
  }));

  await prisma.product.createMany({
    data: formatted,
    skipDuplicates: true,
  });
};