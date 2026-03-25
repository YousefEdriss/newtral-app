import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("username");

  const [cars, setCars] = useState([]);
  const [dealer, setDealer] = useState(null);
  const [review, setReview] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [purchased, setPurchased] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState("");

  useEffect(() => {
    if (!userName) {
      navigate("/login");
      return;
    }
    fetchDealer();
    fetchCars();
  }, [id]);

  const fetchDealer = async () => {
    try {
      const res = await fetch(`/djangoapp/get_dealer/${id}/`);
      const json = await res.json();
      setDealer(json.dealer);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCars = async () => {
    try {
      const res = await fetch("/djangoapp/get_cars/");
      const json = await res.json();
      setCars(json.CarModels || []);
    } catch (e) {
      console.error(e);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const reviewData = {
      name: userName,
      dealership: parseInt(id),
      review,
      purchase: purchased,
      purchase_date: purchaseDate,
      car_make: carMake,
      car_model: carModel,
      car_year: parseInt(carYear) || new Date().getFullYear(),
    };
    try {
      const res = await fetch("/djangoapp/add_review/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      const json = await res.json();
      if (json.status === 200) {
        navigate(`/dealer/${id}`);
      } else {
        alert("Error submitting review. Please try again.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const uniqueMakes = [...new Set(cars.map((c) => c.CarMake))];
  const modelsForMake = cars.filter((c) => c.CarMake === carMake);

  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        <div className="card border-0 shadow-sm rounded-4 p-4 mt-3">
          <h3 className="fw-bold mb-1">Post a Review</h3>
          {dealer && (
            <p className="text-muted mb-4">
              Reviewing: <strong>{dealer.full_name}</strong> — {dealer.city}, {dealer.state}
            </p>
          )}

          <form onSubmit={submitReview}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Your Review</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Share your experience with this dealership..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Car Make</label>
                <select
                  className="form-select"
                  value={carMake}
                  onChange={(e) => { setCarMake(e.target.value); setCarModel(""); }}
                  required
                >
                  <option value="">Select Make</option>
                  {uniqueMakes.map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Car Model</label>
                <select
                  className="form-select"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  required
                >
                  <option value="">Select Model</option>
                  {modelsForMake.map((c) => (
                    <option key={c.CarModel} value={c.CarModel}>{c.CarModel}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Car Year</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 2023"
                  min="2000"
                  max="2025"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="purchased"
                checked={purchased}
                onChange={(e) => setPurchased(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="purchased">
                I purchased a vehicle from this dealership
              </label>
            </div>

            {purchased && (
              <div className="mb-3">
                <label className="form-label fw-semibold">Purchase Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </div>
            )}

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn fw-semibold text-white"
                style={{ background: "#0f3460", borderRadius: "8px", padding: "10px 28px" }}
              >
                Submit Review
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(`/dealer/${id}`)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostReview;
