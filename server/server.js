import express from "npm:express";
import cors from "npm:cors";
import cookirParser from "npm:cookie-parser";
import path from "npm:path";
import dotenv from "npm:dotenv";
import session from "npm:express-session";

import { 
  handleAddJob, 
  handleListJobs, 
  handleListSingleJob,
  handleDeleteJob,
  handleUpdateJob,
 } from "./controllers/jobs.controller.js";

dotenv.config();
// const jwtSecret = process.env.JWT_SECRET;
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

const sess = {
  secret: Deno.env.get('SESSION_SECRET'),
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: false }
}

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }

app.use(session(sess));

app.use(express.json());

// app.use(cookirParser(jwtSecret));

// Serve static files from the ./build folder
app.use(express.static("build"));

// Server index.html for all non-api routes
app.get(/^((?!\/api\/).)*$/, async (req, res) => {
  const indexPath = path.resolve(Deno.cwd(), "build", "index.html");
  res.sendFile(indexPath);
});

app.get('/api/get-session', (req, res) => {
  const isLoggedin = req.session.user;
  if (isLoggedin) {
    res.json({ isLoggedin: true });
  } else {
    res.json({ isLoggedin: false });
  }
});

app.get('/api/set-session', (req, res) => {
  const { username, password} = req.body;
  console.log(username, password);
});

app.get('/api/jobs', handleListJobs);
app.get('/api/jobs/:id', handleListSingleJob);
app.post('/api/jobs', handleAddJob);
app.post('/api/jobs/delete', handleDeleteJob);
app.post('/api/jobs/update/:id', handleUpdateJob);
app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  if (username === 'heybran' && password === '123') {
    req.session.user = {
      username,
    }
    res.json({ message: 'Yay, you\'re logged in. '});
  } else {
    res.status(401).json({
      message: 'Username or password is wrong'
    });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
