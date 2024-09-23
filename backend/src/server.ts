import express from "express";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });
const { PORT } = process.env;
// Express app setup

export const server = express();


server.get("/test", (_req, res) => {
  res.json({ messages: "testing purposes" });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT} `);
});
