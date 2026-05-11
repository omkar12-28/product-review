import { Router } from "express";
import { getAllProducts, importProducts } from "../controllers/product.controller";
import { upload } from "../middleware/upload";

const router = Router();

// GET all products
router.get("/", getAllProducts);
router.post("/import", upload.single("file"), importProducts);

export default router;