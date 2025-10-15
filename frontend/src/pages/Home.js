import React, { useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  // Fetch all jobs from backend
  const fetchJobs = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/jobs`);
    const data = await res.json();
    setJobs(data);
    setAnimateCards(true);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="home-container">
      {/* Top image */}
      <img
        src="/job.jpg"
        alt="Job Tracker"
        className="top-image"
      />

      {/* Navbar below image */}
      <nav className="navbar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2169/2169830.png"
          alt="Job Icon"
          className="job-icon"
        />
        <span className="navbar-title">JOB APPLICATION TRACKER</span>
      </nav>

      {/* No jobs message */}
      {jobs.length === 0 && !showForm && (
        <div className="no-jobs">
          <strong>No applications added yet.</strong>
          <br />
          <button className="add-btn" onClick={() => setShowForm(true)}>＋</button>
        </div>
      )}

      {/* Job form */}
      {showForm && (
        <div className="slide-down">
          <JobForm fetchJobs={fetchJobs} setShowForm={setShowForm} />
        </div>
      )}

      {/* Job list */}
      {jobs.length > 0 && (
        <JobList jobs={jobs} fetchJobs={fetchJobs} animateCards={animateCards} />
      )}

      {/* Floating add button */}
      {!showForm && (
        <button
          className="floating-add-btn"
          onClick={() => setShowForm(true)}
        >＋</button>
      )}
    </div>
  );
};

export default Home;
