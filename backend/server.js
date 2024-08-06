import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import passport from "passport";
import session from "express-session";
import path, { dirname } from 'path';

import "./passport/github.auth.js"
import userRoutes from "./routes/userRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { connectMongoDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const corsOptions = {
    origin: 'http://localhost:5173/',
    credentials: true
};

connectMongoDB();
app.use(cors(corsOptions));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ limit: '50mb' }));

app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});