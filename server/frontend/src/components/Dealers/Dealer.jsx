import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SENTIMENT_ICON = {
  positive: { icon: "😊", color: "success", label: "Positive" },
  negative: { icon: "😞", color: "danger", label: "Negative" },
  neutral:  { icon: "😐", color: "secondary", label: "Neutral" },
};

function Dealer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = sessionStorage.getItem("username");

  useEffect(() => {
    fetchDealer();
    fetchReviews();
  }, [id]);

  const fetchDealer = async () => {
    try {
      const res = await fetch(`/djangoapp/get_dealer/${id}/`);
      const json = await res.json();
      setDealer(json.dealer);
    } catch (e) {
      console.error("Error fetching dealer:", e);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/djangoapp/reviews/dealer/${id}/`);
      const json = await res.json();
      setReviews(json.reviews || []);
    } catch (e) {
      console.error("Error fetching reviews:", e);
    }
    setLoading(false);
  };

  return (
    <div>
      {dealer && (
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="fw-bold mb-1">{dealer.full_name}</h2>
              <p className="text-muted mb-0">
                &#128205; {dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}
              </p>
            </div>
            {userName && (
              <button
                className="btn text-white fw-semibold"
                style={{ background: "#0f3460", borderRadius: "8px" }}
                onClick={() => navigate(`/dealer/${id}/review`)}
              >
                + Post Review
              </button>
            )}
          </div>
        </div>
      )}

      <h4 className="fw-bold mb-3">Customer Reviews</h4>

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="alert alert-info">No reviews yet for this dealer.</div>
      ) : (
        <div className="row g-3">
          {reviews.map((review, idx) => {
            const sentiment = review.sentiment || "neutral";
            const s = SENTIMENT_ICON[sentiment] || SENTIMENT_ICON.neutral;
            return (
              <div className="col-md-6" key={idx}>
                <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold">{review.name}</span>
                    <span className={`badge bg-${s.color}`}>
                      {s.icon} {s.label}
                    </span>
                  </div>
                  <p className="mb-2 text-muted">{review.review}</p>
                  <small className="text-muted">
                    {review.car_year} {review.car_make} {review.car_model}
                    {review.purchase && ` • Purchased on ${review.purchase_date}`}
                  </small>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dealer;
