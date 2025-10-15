import React, { useState } from "react";

const JobForm = ({ fetchJobs, setShowForm }) => {
  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    dateApplied: "",
    notes: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ company: "", position: "", status: "Applied", dateApplied: "", notes: "" });
    setShowForm(false);
    fetchJobs();
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required />
      <input name="position" placeholder="Job Position" value={form.position} onChange={handleChange} required />
      <input name="dateApplied" type="date" value={form.dateApplied} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <textarea name="notes" placeholder="Notes..." rows="2" value={form.notes} onChange={handleChange}></textarea>
      <button type="submit" className="submit-btn">Add Job</button>
      <button type="button" className="delete-btn" style={{marginTop:"8px"}} onClick={() => setShowForm(false)}>Cancel</button>
    </form>
  );
};

export default JobForm;
