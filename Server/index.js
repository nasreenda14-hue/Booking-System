import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import bookingRoute from  "./routes/bookingRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
 
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/booking", bookingRoute);


app.listen(PORT, () => console.log("Server running"));