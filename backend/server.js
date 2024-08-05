import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

import passport from "passport";
import session from "express-session";

import "./passport/github.auth.js"
import userRoutes from "./routes/userRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { connectMongoDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectMongoDB();

const corsOptions = {
    origin: 'https://repohub216.onrender.com/',
    credentials: true 
  };
  
app.use(cors(corsOptions));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ limit: '50mb' }));

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});