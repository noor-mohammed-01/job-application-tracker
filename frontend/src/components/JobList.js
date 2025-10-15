import React, { useEffect, useState } from "react";

const JobList = ({ jobs, fetchJobs, animateCards }) => {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [visible, setVisible] = useState([]);

  // Animate job cards on load
  useEffect(() => {
    if (animateCards) {
      let timers = [];
      jobs.forEach((_, index) => {
        const timer = setTimeout(() => {
          setVisible((prev) => [...prev, index]);
        }, index * 150);
        timers.push(timer);
      });
      return () => timers.forEach((t) => clearTimeout(t));
    }
  }, [jobs, animateCards]);

  // Delete job
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, { method: "DELETE" });
    fetchJobs();
    setVisible([]);
  };

  // Edit job setup
  const handleEdit = (job) => {
    setEditId(job._id);
    setEditForm(job);
  };

  // Update edit form fields
  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  // Submit updated job
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/jobs/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditId(null);
    fetchJobs();
    setVisible([]);
  };

  return (
    <div className="job-list">
      {jobs.map((job, idx) => (
        <div
          key={job._id}
          className={`job-card ${visible.includes(idx) ? "show" : ""}`}
        >
          {editId === job._id ? (
            // Edit form
            <form onSubmit={handleUpdate} className="job-form">
              <input
                name="company"
                value={editForm.company}
                onChange={handleChange}
                placeholder="Company"
              />
              <input
                name="position"
                value={editForm.position}
                onChange={handleChange}
                placeholder="Position"
              />
              <input
                name="dateApplied"
                type="date"
                value={editForm.dateApplied || ""}
                onChange={handleChange}
              />
              <select
                name="status"
                value={editForm.status}
                onChange={handleChange}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              <textarea
                name="notes"
                rows="2"
                value={editForm.notes}
                onChange={handleChange}
                placeholder="Notes"
              ></textarea>
              <div className="actions">
                <button type="submit" className="edit-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // Job card view
            <>
              <h3>{job.position}</h3>
              <p>
                <strong>Company:</strong> {job.company}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`status-badge ${
                    job.status.toLowerCase() === "applied"
                      ? "status-applied"
                      : job.status.toLowerCase() === "interview"
                      ? "status-interview"
                      : job.status.toLowerCase() === "offer"
                      ? "status-offer"
                      : "status-rejected"
                  }`}
                >
                  {job.status}
                </span>
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(job.dateApplied).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              {job.notes && (
                <p>
                  <strong>Notes:</strong> {job.notes}
                </p>
              )}

              <div className="actions">
                <button className="edit-btn" onClick={() => handleEdit(job)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobList;
