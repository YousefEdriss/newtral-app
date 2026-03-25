require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/dealersdb";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
    seedData();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// ─── Schemas ───────────────────────────────────────────────────────────────

const dealerSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  city: String,
  state: String,
  st: String,
  address: String,
  zip: String,
  lat: Number,
  long: Number,
  short_name: String,
  full_name: String,
});

const reviewSchema = new mongoose.Schema({
  id: Number,
  name: String,
  dealership: Number,
  review: String,
  purchase: Boolean,
  purchase_date: String,
  car_make: String,
  car_model: String,
  car_year: Number,
});

const Dealer = mongoose.model("Dealer", dealerSchema);
const Review = mongoose.model("Review", reviewSchema);

// ─── Seed initial data ──────────────────────────────────────────────────────

async function seedData() {
  const dealerCount = await Dealer.countDocuments();
  if (dealerCount === 0) {
    const dealersPath = path.join(__dirname, "data", "dealers.json");
    if (fs.existsSync(dealersPath)) {
      const dealers = JSON.parse(fs.readFileSync(dealersPath, "utf8"));
      await Dealer.insertMany(dealers);
      console.log(`Seeded ${dealers.length} dealers`);
    }
  }

  const reviewCount = await Review.countDocuments();
  if (reviewCount === 0) {
    const reviewsPath = path.join(__dirname, "data", "reviews.json");
    if (fs.existsSync(reviewsPath)) {
      const reviews = JSON.parse(fs.readFileSync(reviewsPath, "utf8"));
      await Review.insertMany(reviews);
      console.log(`Seeded ${reviews.length} reviews`);
    }
  }
}

// ─── Routes ────────────────────────────────────────────────────────────────

app.get("/fetchDealers", async (req, res) => {
  try {
    const dealers = await Dealer.find().sort({ id: 1 });
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/fetchDealers/:state", async (req, res) => {
  try {
    const dealers = await Dealer.find({ state: req.params.state }).sort({ id: 1 });
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/fetchDealer/:id", async (req, res) => {
  try {
    const dealer = await Dealer.findOne({ id: parseInt(req.params.id) });
    res.json(dealer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/fetchReviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/fetchReviews/dealer/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ dealership: parseInt(req.params.id) });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/insertReview", async (req, res) => {
  try {
    const maxReview = await Review.findOne().sort({ id: -1 });
    const newId = maxReview ? maxReview.id + 1 : 1;
    const review = new Review({ id: newId, ...req.body });
    await review.save();
    res.json({ message: "Review inserted successfully", id: newId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Dealer service running on port ${PORT}`));
