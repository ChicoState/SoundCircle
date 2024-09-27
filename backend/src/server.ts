import express from "express";
import * as dotenv from "dotenv";
import { RegisterRoutes } from "../build/routes"; // Adjust the import path to where TSOA generated the routes

// Load environment variables
dotenv.config({ path: ".env.local" });

const { PORT } = process.env || 8080; // Use port from .env.local or default to 8080

// Express app setup
export const server = express();

// JSON body parsing middleware
server.use(express.json());

// Register TSOA-generated routes
RegisterRoutes(server);

// Swagger documentation route
server.get("/docs", (_req, res) => {
  res.json({ message: "Swagger docs" });
});

// Test route for debugging purposes
server.get("/test", (_req, res) => {
  res.json({ message: "Testing purposes" });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
