import express from "express";
import cors from "cors";
import cookirParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";

import { 
  handleAddJob, 
  handleListJobs, 
  handleListSingleJob,
  handleDeleteJob,
  handleUpdateJob,
 } from "./controllers/jobs.controller.js";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const app = express();

app.use(
  cors({
    origin: /*process.env.CLIENT_URL*/ "*",
    credentials: true,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Acess-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  }),
);

app.use(express.json());

app.use(cookirParser(jwtSecret));

// Serve static files from the ./build folder
app.use(express.static("build"));

// Server index.html for all non-api routes
app.get(/^((?!\/api\/).)*$/, async (req, res) => {
  const indexPath = path.resolve(process.cwd(), "build", "index.html");
  res.sendFile(indexPath);
});

app.get('/api/jobs', handleListJobs);
app.get('/api/jobs/:id', handleListSingleJob);
app.post('/api/jobs', handleAddJob);
app.post('/api/jobs/delete', handleDeleteJob);
app.post('/api/jobs/update/:id', handleUpdateJob);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
