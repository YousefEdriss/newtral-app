import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dealers() {
  const [dealers, setDealers] = useState([]);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [loading, setLoading] = useState(true);
  const userName = sessionStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/djangoapp/get_dealers/");
      const json = await res.json();
      const dealerList = json.dealers || [];
      setDealers(dealerList);
      setFilteredDealers(dealerList);
      const uniqueStates = ["All", ...new Set(dealerList.map((d) => d.state))].sort();
      setStates(uniqueStates);
    } catch (e) {
      console.error("Error fetching dealers:", e);
    }
    setLoading(false);
  };

  const filterByState = async (state) => {
    setSelectedState(state);
    if (state === "All") {
      setFilteredDealers(dealers);
      return;
    }
    try {
      const res = await fetch(`/djangoapp/get_dealers/${state}/`);
      const json = await res.json();
      setFilteredDealers(json.dealers || []);
    } catch (e) {
      console.error("Error filtering dealers:", e);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Car Dealerships</h2>
        <div className="d-flex align-items-center gap-2">
          <label className="fw-semibold mb-0">Filter by State:</label>
          <select
            className="form-select form-select-sm"
            style={{ width: "180px" }}
            value={selectedState}
            onChange={(e) => filterByState(e.target.value)}
          >
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead style={{ background: "#0f3460", color: "#fff" }}>
              <tr>
                <th>ID</th>
                <th>Dealer Name</th>
                <th>City</th>
                <th>State</th>
                <th>Address</th>
                <th>Zip</th>
                {userName && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredDealers.length === 0 ? (
                <tr>
                  <td colSpan={userName ? 7 : 6} className="text-center text-muted py-4">
                    No dealers found.
                  </td>
                </tr>
              ) : (
                filteredDealers.map((dealer) => (
                  <tr key={dealer.id}>
                    <td>{dealer.id}</td>
                    <td
                      className="fw-semibold text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/dealer/${dealer.id}`)}
                    >
                      {dealer.full_name}
                    </td>
                    <td>{dealer.city}</td>
                    <td>{dealer.state}</td>
                    <td>{dealer.address}</td>
                    <td>{dealer.zip}</td>
                    {userName && (
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => navigate(`/dealer/${dealer.id}/review`)}
                        >
                          Review Dealer
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dealers;
