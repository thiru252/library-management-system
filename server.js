const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- MONGODB ATLAS CONNECTION ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected (Atlas)"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

/* ---------- ROUTES ---------- */
app.use("/api/books", bookRoutes);

/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});