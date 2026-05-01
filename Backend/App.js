import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";  

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables first
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Then connect to database after env vars are loaded
import { connectDatabase } from "./config/connectdatabase.js";
connectDatabase();

const app = express();
app.use(cors());  // Enable CORS for all routes
import Products from "./Routes/Products.js";
import Order from "./Routes/Order.js";

app.use(express.json());
app.use("/api/v1", Products);
app.use("/api/v1", Order);

app.get("/", (req, res) => {
  res.send(`Server running successfully on port ${process.env.PORT}`);
});

// Global error handler (should be after all routes)
app.use((err, req, res, next) => {
  // Log stack in development
  console.error(err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server listening on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});