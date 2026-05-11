import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to the Product Reviews API");
});
app.use("/api/products", productRoutes);

export default app;